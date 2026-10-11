"use client";

import { useRef, useState, type HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import { catalogProducts, MAX_SELECTION } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";
import { site } from "@/content/data/site";

const inputClass = "mt-[8px] min-h-[48px] w-full min-w-0 rounded-none border-0 border-b border-line-strong bg-paper-2 px-[12px] py-[12px] text-f16 font-normal md:text-f14";
const secondaryButtonClass = "flex min-h-[48px] items-center justify-center border border-line-strong px-[18px] py-[12px] text-f14 transition-colors hover:border-ink";
type RequestField = { id: string; label: string; required?: boolean; type?: HTMLInputTypeAttribute; autoComplete?: string };
const contactFields: RequestField[] = [
  { id: "name", label: "Your name", required: true, autoComplete: "name" },
  { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { id: "company", label: "Company / practice", autoComplete: "organization" },
];
const projectFields: RequestField[] = [
  { id: "location", label: "Project location (city, country)", required: true },
  { id: "quantity", label: "Quantity and unit (m², ft² or pieces)" },
  { id: "schedule", label: "Target delivery / project schedule" },
];
const technicalFields: RequestField[] = [
  { id: "geometry", label: "Dimensions, thickness or custom geometry" },
  { id: "finish", label: "Finish, color and sample reference" },
  { id: "drawings", label: "Drawing / 3D model link and revision" },
  { id: "attachment", label: "Substrate, support and fixing conditions" },
];
const fields = [...contactFields, ...projectFields, ...technicalFields];
const requestKinds = [
  { value: "quote", label: "Project quote", detail: "Scope and pricing" },
  { value: "sample", label: "Samples / mock-up", detail: "Physical material review" },
  { value: "documents", label: "Technical documents", detail: "Product-specific evidence" },
];

export default function ProjectRequest({ initialIds, intent }: { initialIds?: string[]; intent: string }) {
  const { ids: savedIds, setSelection } = useSelection();
  const [chosen, setChosen] = useState(initialIds);
  const ids = chosen ?? savedIds;
  const [kind, setKind] = useState(intent === "sample" ? "sample" : intent === "documents" ? "documents" : "quote");
  const [values, setValues] = useState<Record<string, string>>({});
  const [preparedBody, setPreparedBody] = useState<string | null>(null);
  const [status, setStatus] = useState<{ body: string; message: string } | null>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const products = ids.flatMap(id => catalogProducts.filter(p => p.id === id));
  const kindLabel = kind === "sample" ? "Sample request" : kind === "documents" ? "Technical document request" : "Project quote request";
  const body = [
    `${kindLabel} to Cladvera`, "", "PRODUCT SELECTION", ...products.map(p => `- ${p.manufacturer} / ${p.name}\n  ${site.url}${p.path}`),
    ...(products.length ? [] : ["Please help select a product for the brief below."]), "", "PROJECT BRIEF",
    ...fields.map(field => `${field.label}: ${values[field.id] || "To confirm"}`),
    `Role: ${values.role || "To confirm"}`, `Project stage: ${values.stage || "To confirm"}`,
    `Application and required performance / documents: ${values.requirements || "To confirm"}`,
    `Additional scope, sample destination or commercial requirements: ${values.notes || "To confirm"}`,
    "", "Please confirm the proposed product construction, scope, required documents, sample options and commercial terms for this project.",
  ].join("\n");
  const prepared = preparedBody === body;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Cladvera — ${kindLabel}`)}&body=${encodeURIComponent(body)}`;

  function invalidateBrief() {
    setPreparedBody(null);
    setStatus(null);
  }
  function change(id: string, value: string) {
    setValues(current => ({ ...current, [id]: value }));
    invalidateBrief();
  }
  function chooseProducts(next: string[]) {
    setChosen(next);
    setSelection(next);
    invalidateBrief();
  }
  function toggle(id: string) {
    if (ids.includes(id)) chooseProducts(ids.filter(item => item !== id));
    else if (ids.length < MAX_SELECTION) chooseProducts([...ids, id]);
  }
  function renderField(field: RequestField) {
    return (
      <label key={field.id} className="min-w-0 text-f14 font-medium" htmlFor={`request-${field.id}`}>
        {field.label}{field.required ? " *" : ""}
        <input
          id={`request-${field.id}`}
          name={field.id}
          required={field.required}
          type={field.type || "text"}
          autoComplete={field.autoComplete ?? "off"}
          inputMode={field.id === "drawings" ? "url" : undefined}
          maxLength={field.id === "drawings" ? 500 : 180}
          className={inputClass}
          value={values[field.id] || ""}
          onChange={event => change(field.id, event.target.value)}
        />
      </label>
    );
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        setPreparedBody(body);
        setStatus({ body, message: "Email brief prepared below. Review it, then open your email draft to send." });
        requestAnimationFrame(() => previewRef.current?.focus());
      }}
      className="grid min-w-0 gap-[40px] md:gap-[56px]"
    >
      <section aria-labelledby="request-products-heading" className="grid min-w-0 gap-[28px] border-t border-ink pt-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[56px]">
        <div>
          <p className="mb-[14px] font-mono text-f12 text-accent">01 / SELECTION</p>
          <h2 id="request-products-heading" className="text-[28px] leading-[1.12] tracking-[-0.04em]">Products &amp;<br className="hidden lg:block" /> purpose.</h2>
          <p className="mt-[16px] max-w-[420px] text-f14 leading-[1.8] text-ink-2">Start with your materials and the kind of support you need.</p>
        </div>
        <div className="min-w-0">
          <fieldset className="min-w-0">
            <legend className="mb-[14px] text-f14 font-medium">Request type</legend>
            <div className="grid border-t border-line-strong sm:grid-cols-3">
              {requestKinds.map(option => (
                <label key={option.value} className={`flex cursor-pointer items-start gap-[10px] border-b border-line-strong px-[12px] py-[16px] ${kind === option.value ? "bg-paper-2" : "hover:bg-paper-2/60"}`}>
                  <input type="radio" name="intent" value={option.value} checked={kind === option.value} className="mt-[4px] h-[16px] w-[16px] shrink-0 accent-accent" onChange={() => { setKind(option.value); invalidateBrief(); }} />
                  <span className="min-w-0"><span className="block text-f14 font-medium">{option.label}</span><span className="mt-[4px] block text-f12 text-ink-3">{option.detail}</span></span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-[28px] min-w-0" aria-describedby="request-selection-help">
            <legend className="text-f14 font-medium">Product selection</legend>
            <p id="request-selection-help" className="mt-[8px] text-f14 leading-[1.8] text-ink-2">Select up to {MAX_SELECTION} families, or leave blank for selection assistance.</p>
            <div className="mt-[16px] flex flex-wrap items-center justify-between gap-x-[20px] gap-y-[8px] border-b border-line-strong pb-[12px]">
              <p aria-live="polite" className="font-mono text-f12 text-ink-2">{ids.length} / {MAX_SELECTION} SELECTED</p>
              <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[4px] text-f12">
                <button type="button" disabled={ids.length === 0} onClick={() => chooseProducts([])} className="min-h-[44px] underline underline-offset-4 hover:text-accent disabled:cursor-default disabled:text-ink-3 disabled:no-underline">Clear selection</button>
                <Link href={`/compare?products=${encodeURIComponent(ids.join(","))}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-[6px] text-accent underline underline-offset-4">Review selection (new tab) <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
            <div className="grid gap-x-[24px] md:grid-cols-2">
              {catalogProducts.map(product => {
                const selected = ids.includes(product.id);
                const unavailable = !selected && ids.length >= MAX_SELECTION;
                return (
                  <label key={product.id} className={`flex min-w-0 items-start gap-[12px] border-b border-line py-[17px] pl-[10px] pr-[8px] ${selected ? "border-l-2 border-l-accent bg-paper-2" : "border-l-2 border-l-transparent"} ${unavailable ? "cursor-not-allowed text-ink-3" : "cursor-pointer hover:bg-paper-2"}`}>
                    <input className="mt-[3px] h-[16px] w-[16px] shrink-0 accent-accent" type="checkbox" name="products" value={product.id} checked={selected} disabled={unavailable} onChange={() => toggle(product.id)} />
                    <span className="min-w-0"><span className="block text-[10px] uppercase tracking-[0.08em] text-ink-3">{product.manufacturer}</span><span className={`mt-[4px] block text-f14 leading-[1.5] ${selected ? "font-medium" : ""}`}>{product.name}</span></span>
                  </label>
                );
              })}
            </div>
            {ids.length >= MAX_SELECTION && <p className="mt-[12px] text-f12 text-ink-2">Selection is full. Remove a product to choose another.</p>}
          </fieldset>
        </div>
      </section>

      <section aria-labelledby="request-details-heading" className="grid min-w-0 gap-[28px] border-t border-ink pt-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[56px]">
        <div>
          <p className="mb-[14px] font-mono text-f12 text-accent">02 / PROJECT BRIEF</p>
          <h2 id="request-details-heading" className="text-[28px] leading-[1.12] tracking-[-0.04em]">The details<br className="hidden lg:block" /> that matter.</h2>
          <p className="mt-[16px] max-w-[420px] text-f14 leading-[1.8] text-ink-2">Required fields are marked *. Share what you know; other details can be confirmed together.</p>
        </div>
        <div className="grid min-w-0 gap-[32px]">
          <fieldset className="min-w-0">
            <legend className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Contact details</legend>
            <div className="grid min-w-0 gap-x-[24px] gap-y-[20px] md:grid-cols-2">
              {contactFields.map(renderField)}
              <label className="min-w-0 text-f14 font-medium" htmlFor="request-role">Your role<select id="request-role" name="role" autoComplete="off" className={inputClass} value={values.role || ""} onChange={event => change("role", event.target.value)}><option value="">Select role</option>{["Architect / designer", "Procurement / developer", "Contractor / installer", "Fabricator / distributor", "Other project participant"].map(value => <option key={value}>{value}</option>)}</select></label>
            </div>
          </fieldset>
          <fieldset className="min-w-0 border-t border-line pt-[24px]">
            <legend className="pr-[12px] font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Project &amp; schedule</legend>
            <div className="grid min-w-0 gap-x-[24px] gap-y-[20px] md:grid-cols-2">
              {projectFields.map(renderField)}
              <label className="min-w-0 text-f14 font-medium" htmlFor="request-stage">Project stage<select id="request-stage" name="stage" autoComplete="off" className={inputClass} value={values.stage || ""} onChange={event => change("stage", event.target.value)}><option value="">Select stage</option>{["Concept / material selection", "Design development", "Technical review / specification", "Tender / procurement", "Approved for order", "Construction / replacement"].map(value => <option key={value}>{value}</option>)}</select></label>
            </div>
          </fieldset>
          <fieldset className="min-w-0 border-t border-line pt-[24px]">
            <legend className="pr-[12px] font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Material &amp; technical requirements</legend>
            <p className="mb-[20px] text-f14 leading-[1.8] text-ink-2">For custom GFRP or UHPC, include geometry, drawing revision, panelization and fixing conditions. Attach files in your email application after opening the draft.</p>
            <div className="grid min-w-0 gap-x-[24px] gap-y-[20px] md:grid-cols-2">
              {technicalFields.map(renderField)}
              <label className="min-w-0 text-f14 font-medium md:col-span-2" htmlFor="request-requirements">Application and required performance / documents<textarea id="request-requirements" name="requirements" className={inputClass} rows={4} maxLength={1500} value={values.requirements || ""} onChange={event => change("requirements", event.target.value)} placeholder="Location of use, fire or environmental requirements, technical data, CAD/BIM needs, reports to review…" /></label>
              <label className="min-w-0 text-f14 font-medium md:col-span-2" htmlFor="request-notes">Additional scope / sample destination / commercial requirements<textarea id="request-notes" name="notes" className={inputClass} rows={4} maxLength={1500} value={values.notes || ""} onChange={event => change("notes", event.target.value)} placeholder="Sample size and purpose, mold ownership, packaging, delivery terms, or other project questions…" /></label>
            </div>
          </fieldset>
        </div>
      </section>

      <section aria-labelledby="request-review-heading" className="grid min-w-0 gap-[28px] border-t border-ink pt-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[56px]">
        <div>
          <p className="mb-[14px] font-mono text-f12 text-accent">03 / REVIEW &amp; SEND</p>
          <h2 id="request-review-heading" className="text-[28px] leading-[1.12] tracking-[-0.04em]">Ready for<br className="hidden lg:block" /> a conversation.</h2>
        </div>
        <div className="min-w-0">
          <p className="max-w-[680px] text-f14 leading-[1.8] text-ink-2">This page prepares a brief for <span className="break-all font-medium text-ink">{site.contact.email}</span>. You send it from your email application. Product availability, sample cost, timing and delivery terms are confirmed in the response.</p>
          <p className="mt-[12px] max-w-[680px] text-f12 leading-[1.8] text-ink-3">Contact details stay in this form while you prepare the draft. Only product IDs are saved in this browser. Preparing a brief does not send it.</p>
          <button type="submit" className="mt-[24px] inline-flex min-h-[52px] w-full items-center justify-between gap-[24px] bg-ink px-[20px] py-[14px] text-f14 font-medium text-paper transition-colors hover:bg-accent sm:w-auto">Prepare email brief <span aria-hidden="true">↗</span></button>
          {prepared && (
            <div className="mt-[32px] min-w-0 border-t border-line-strong pt-[24px]">
              <label className="text-f14 font-medium" htmlFor="email-brief">Email brief preview</label>
              <textarea ref={previewRef} id="email-brief" className={`${inputClass} scroll-mt-[110px] font-mono leading-[1.8]`} rows={16} readOnly value={body} aria-describedby="email-brief-help" />
              <div className="mt-[20px] grid gap-[12px] sm:flex sm:flex-wrap">
                <a href={mailto} className="flex min-h-[48px] items-center justify-center gap-[20px] bg-accent px-[18px] py-[12px] text-f14 font-medium text-paper transition-colors hover:bg-accent-hover">Open email draft <span aria-hidden="true">↗</span></a>
                <button type="button" className={secondaryButtonClass} onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(body);
                    setStatus({ body, message: `Brief copied. Paste it into an email to ${site.contact.email}.` });
                  } catch {
                    setStatus({ body, message: "Copy the text from the email brief preview above." });
                  }
                }}>Copy brief</button>
                <button type="button" className={secondaryButtonClass} onClick={() => {
                  const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = "cladvera-project-brief.txt";
                  anchor.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}>Download brief</button>
              </div>
              <p id="email-brief-help" className="mt-[14px] text-f12 leading-[1.8] text-ink-3">If your email app cannot open a long draft, copy or download the brief and attach it to an email. Add your drawings and supporting files in your email application.</p>
            </div>
          )}
          <p role="status" className="mt-[16px] text-f14 leading-[1.7] text-accent">{prepared && status?.body === body ? status.message : ""}</p>
        </div>
      </section>
    </form>
  );
}
