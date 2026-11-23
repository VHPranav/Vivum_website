"use client";

import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string };
type Props = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
};

/** Compact themed select; the native control preserves form submission and validation. */
export function SelectField({ id, name, label, options, required, defaultValue = "", invalid, describedBy }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: "", at: 0 });
  const selected = options.find((option) => option.value === value);
  const listId = `${id}-options`;

  const show = () => {
    const rect = root.current?.getBoundingClientRect();
    setAbove(!!rect && window.innerHeight - rect.bottom < Math.min(options.length * 44 + 12, 240) && rect.top > 260);
    setActive(Math.max(0, options.findIndex((option) => option.value === value)));
    setOpen(true);
  };
  const choose = (index: number) => {
    if (!options[index]) return;
    setValue(options[index].value);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  return (
    <div ref={root} className="relative min-w-0">
      <select name={name} value={value} onChange={(event) => setValue(event.target.value)} required={required} tabIndex={-1} aria-hidden="true" className="sr-only pointer-events-none">
        <option value="">Select an option</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        aria-required={required}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => open ? setOpen(false) : show()}
        onBlur={(event) => { if (!root.current?.contains(event.relatedTarget as Node)) setOpen(false); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); setOpen(false); return; }
          if (event.key === "Tab") { setOpen(false); return; }
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            if (!open) { show(); return; }
            setActive((index) => event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) choose(active); else show();
          } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            const now = Date.now();
            search.current = { text: (now - search.current.at < 700 ? search.current.text : "") + event.key.toLowerCase(), at: now };
            const index = options.findIndex((option) => option.label.toLowerCase().startsWith(search.current.text));
            if (!open) show();
            if (index >= 0) setActive(index);
          }
        }}
        className={`flex min-h-11 w-full items-center justify-between gap-4 border-b bg-transparent py-2.5 text-left text-[0.9375rem] leading-snug text-navy transition-colors focus-visible:border-navy focus-visible:outline-none ${invalid ? "border-red-400" : open ? "border-navy" : "border-ink/20"}`}
      >
        <span className={`min-w-0 ${selected ? "" : "text-ink/35"}`}>{selected?.label ?? "Select an option"}</span>
        <svg aria-hidden viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.3" className={`h-2 w-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}><path d="m1 1 5 5 5-5" /></svg>
      </button>
      {open && (
        <ul id={listId} role="listbox" aria-label={label} data-lenis-prevent className={`absolute inset-x-0 z-30 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-navy/10 bg-white p-1.5 shadow-[0_12px_36px_-12px_rgba(13,59,122,0.22)] ${above ? "bottom-full mb-2" : "top-full mt-2"}`}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === option.value}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
              className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm leading-snug text-navy ${index === active ? "bg-[#f1f0ec]" : "bg-white"}`}
            >
              <span>{option.label}</span>
              {value === option.value && <span aria-hidden className="shrink-0 text-sm">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
