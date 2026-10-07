"use client";

import { useEffect, useRef, useState } from "react";

export function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  hint,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-f14 font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-[6px] w-full rounded-control border border-line-strong bg-paper px-[12px] py-[9px] text-f14 focus:border-ink"
      />
      {hint && <p className="mt-[4px] text-f12 text-ink-3">{hint}</p>}
    </div>
  );
}

export function TextArea({ label, name, required = false, rows = 4, hint }: { label: string; name: string; required?: boolean; rows?: number; hint?: string }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-f14 font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        className="mt-[6px] w-full rounded-control border border-line-strong bg-paper px-[12px] py-[9px] text-f14 focus:border-ink"
      />
      {hint && <p className="mt-[4px] text-f12 text-ink-3">{hint}</p>}
    </div>
  );
}

export function Select({
  label,
  name,
  options,
  required = false,
  hint,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  hint?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-f14 font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="mt-[6px] w-full rounded-control border border-line-strong bg-paper px-[12px] py-[9px] text-f14 focus:border-ink"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-[4px] text-f12 text-ink-3">{hint}</p>}
    </div>
  );
}

export function CheckboxGroup({ legend, name, options }: { legend: string; name: string; options: Array<{ value: string; label: string }> }) {
  return (
    <fieldset>
      <legend className="text-f14 font-medium text-ink">{legend}</legend>
      <div className="mt-[8px] grid gap-[6px] sm:grid-cols-2">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-[8px] text-f14 text-ink-2">
            <input type="checkbox" name={name} value={o.value} className="h-[16px] w-[16px] accent-accent" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FormSection({ step, title, children }: { step?: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-line bg-paper p-[20px]">
      <h2 className="mb-[16px] text-f18 font-semibold">
        {step !== undefined && <span className="mr-[8px] font-mono text-f14 text-accent">{String(step).padStart(2, "0")}</span>}
        {title}
      </h2>
      <div className="grid gap-[14px]">{children}</div>
    </section>
  );
}

/** Hidden anti-spam fields: honeypot plus time on the form. */
export function SpamGuards() {
  const started = useRef<number>(0);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    started.current = Date.now();
    const timer = window.setInterval(() => setElapsed(Date.now() - started.current), 500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <>
      <input type="hidden" name="form_elapsed_ms" value={elapsed} />
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "done"; reference?: string; delivered: boolean }
  | { status: "error"; message: string };

export async function submitInquiry(form: HTMLFormElement): Promise<SubmitState> {
  const data = new FormData(form);
  try {
    const res = await fetch("/api/inquiries", { method: "POST", body: data });
    const json = (await res.json()) as { ok: boolean; error?: string; reference?: string; delivered?: boolean };
    if (!res.ok || !json.ok) return { status: "error", message: json.error ?? "Something went wrong. Please email us instead." };
    return { status: "done", reference: json.reference, delivered: Boolean(json.delivered) };
  } catch {
    return { status: "error", message: "Network error. Please try again or email us." };
  }
}

export function SubmitResult({ state, email }: { state: SubmitState; email: string }) {
  if (state.status === "done") {
    return (
      <div className="rounded-card border border-ok/30 bg-ok-bg p-[16px] text-f14 text-ok">
        <p className="font-semibold">Received{state.reference ? ` (reference ${state.reference})` : ""}.</p>
        <p className="mt-[4px]">
          {state.delivered
            ? "A named contact will reply within one business day."
            : "Email delivery is not configured on this deployment yet; the request was logged. Please also write to "}
          {!state.delivered && (
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
          )}
        </p>
      </div>
    );
  }
  if (state.status === "error") {
    return <p className="rounded-card border border-warn/30 bg-warn-bg p-[12px] text-f14 text-warn">{state.message}</p>;
  }
  return null;
}
