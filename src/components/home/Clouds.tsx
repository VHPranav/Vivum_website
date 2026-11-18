"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting cloud bank rendered with a small WebGL shader (layered fractal noise), as in the
 * Tresmares hero. `progress` (0–1, driven by scroll) raises the bank until the clouds fill the
 * screen with the page colour, dissolving the hero into the next section.
 * Renders at reduced resolution (clouds are soft) and pauses when off-screen.
 */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;

float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<6;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float aspect=uRes.x/uRes.y;
  vec2 p=vec2(uv.x*aspect,uv.y);
  float t=uTime*.018;

  // Back layer: slow, large billows. Front layer: faster, finer wisps.
  float warp=fbm(p*1.2-vec2(t*.6,0.));
  float d1=fbm(p*vec2(1.6,2.6)+vec2(t,0.)+warp);
  float d2=fbm(p*vec2(2.8,4.2)+vec2(t*1.7,4.)+.6*warp);

  // The bank's top edge rises with scroll; billows break the edge.
  float horizon=mix(.40,1.35,uProgress);
  float edge=horizon+(d1-.5)*.28;
  float bank=smoothstep(edge,edge-.30,uv.y);
  float bank2=smoothstep(edge+.12,edge-.22,uv.y);

  float c1=smoothstep(.30,.62,d1*bank*1.38);
  float c2=smoothstep(.46,.78,d2*bank2*1.2)*.8;
  float a=clamp(c1+c2*(1.-c1),0.,1.);
  a=mix(a,1.,smoothstep(.72,1.,uProgress));

  // Soft blue-grey shading in the hollows, page colour on the crests.
  vec3 paper=vec3(.984,.980,.965);
  vec3 shade=vec3(.84,.88,.92);
  vec3 col=mix(shade,paper,clamp(.35+d1*.9,0.,1.));
  col=mix(col,paper,smoothstep(.6,1.,uProgress));
  gl_FragColor=vec4(col*a,a);
}`;

export function Clouds({ progressRef, className = "" }: { progressRef: React.RefObject<number>; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl || gl.isContextLost()) {
      el.dataset.fallback = "1";
      return;
    }
    delete el.dataset.fallback;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      el.dataset.fallback = "1";
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uProgress = gl.getUniformLocation(prog, "uProgress");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SCALE = 0.5;
    const resize = () => {
      const w = Math.max(1, Math.round(el.clientWidth * SCALE));
      const h = Math.max(1, Math.round(el.clientHeight * SCALE));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      gl.uniform1f(uTime, reduced ? 0 : (now - start) / 1000 + 40);
      gl.uniform1f(uProgress, progressRef.current ?? 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // Free GPU objects but keep the context: StrictMode re-runs this effect on the same canvas.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [progressRef]);

  return <canvas ref={canvas} aria-hidden className={`block h-full w-full ${className}`} />;
}

/**
 * Stand-in for the hero photograph (Tresmares uses a grayscale mountain photo): layered
 * Montenegrin ridgelines in soft blue-grey with a fine grain. Replace with the real photo.
 */
export function Ridges() {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="r-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f4ee" />
          <stop offset="1" stopColor="#e7edf2" />
        </linearGradient>
        <linearGradient id="r-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dde5ec" />
          <stop offset="1" stopColor="#eaeff3" />
        </linearGradient>
        <linearGradient id="r-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfccd8" />
          <stop offset="1" stopColor="#dbe3ea" />
        </linearGradient>
        <linearGradient id="r-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#97aabd" />
          <stop offset="1" stopColor="#ccd7e1" />
        </linearGradient>
        <filter id="r-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.15  0 0 0 0 0.25  0 0 0 0.55 0" />
        </filter>
      </defs>
      <rect width="1440" height="900" fill="url(#r-sky)" />
      <path
        fill="url(#r-far)"
        d="M0 470 L90 452 L170 468 L260 430 L340 446 L430 404 L500 420 L590 372 L660 392 L740 352 L820 380 L900 340 L980 366 L1060 330 L1130 352 L1210 318 L1290 350 L1370 336 L1440 352 V900 H0Z"
      />
      <path
        fill="url(#r-mid)"
        d="M0 560 L110 520 L190 534 L300 470 L370 492 L450 430 L520 452 L600 400 L650 414 L720 362 L760 376 L840 330 L880 338 L950 300 L990 312 L1060 360 L1140 384 L1230 420 L1330 446 L1440 430 V900 H0Z"
      />
      <path
        fill="url(#r-near)"
        d="M0 660 L120 610 L220 628 L330 566 L420 592 L520 540 L600 560 L700 506 L770 520 L860 470 L930 488 L1010 452 L1080 470 L1170 520 L1260 548 L1350 580 L1440 566 V900 H0Z"
      />
      <rect width="1440" height="900" filter="url(#r-grain)" opacity="0.35" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
