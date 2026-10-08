"use client";
import { useState } from "react";
import Link from "next/link";
import { catalogProducts, MAX_SELECTION } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";
import { site } from "@/content/data/site";

const inputClass = "mt-[6px] w-full rounded-control border border-line-strong bg-paper px-[12px] py-[10px] text-f14";
const fields = [
  { id: "name", label: "Your name", required: true }, { id: "email", label: "Email", type: "email", required: true },
  { id: "company", label: "Company / practice" }, { id: "location", label: "Project location (city, country)", required: true },
  { id: "quantity", label: "Quantity and unit (m², ft² or pieces)" }, { id: "schedule", label: "Target delivery / project schedule" },
  { id: "geometry", label: "Dimensions, thickness or custom geometry" }, { id: "finish", label: "Finish, color and sample reference" },
  { id: "drawings", label: "Drawing / 3D model link and revision" }, { id: "attachment", label: "Substrate, support and fixing conditions" },
];
export default function ProjectRequest({ initialIds, intent }: { initialIds?: string[]; intent: string }) {
  const { ids: savedIds, setSelection } = useSelection();
  const [chosen, setChosen] = useState(initialIds);
  const ids = chosen ?? savedIds;
  const [kind, setKind] = useState(intent === "sample" ? "sample" : intent === "documents" ? "documents" : "quote");
  const [values, setValues] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState(false);
  const [status, setStatus] = useState("");
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
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Cladvera — ${kindLabel}`)}&body=${encodeURIComponent(body)}`;
  function change(id: string, value: string) { setValues(current => ({ ...current, [id]: value })); setPrepared(false); }
  function toggle(id: string) { const next = ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]; setChosen(next); setSelection(next); setPrepared(false); }
  return <form onSubmit={event => { event.preventDefault(); setPrepared(true); setStatus("Email brief prepared below. Review it, then open your email draft to send."); }} className="grid gap-[28px]">
    <fieldset className="rounded-card border border-line p-[20px]"><legend className="px-[8px] text-f18 font-semibold">1. Products and request type</legend>
      <div className="mb-[18px] flex flex-wrap gap-[16px]">{[["quote", "Quote"], ["sample", "Samples / mock-up"], ["documents", "Technical documents"]].map(([value, label]) => <label key={value} className="flex items-center gap-[8px] text-f14"><input type="radio" name="intent" value={value} checked={kind === value} onChange={() => { setKind(value); setPrepared(false); }} />{label}</label>)}</div>
      <p className="mb-[12px] text-f14 text-ink-2">Select up to {MAX_SELECTION} families, or leave blank for selection assistance. <Link href={`/compare?products=${encodeURIComponent(ids.join(","))}`} className="text-accent underline">Review this selection</Link>.</p>
      <div className="grid gap-[8px] md:grid-cols-2">{catalogProducts.map(p => <label key={p.id} className="flex items-start gap-[10px] rounded-control border border-line p-[12px] text-f14"><input className="mt-[4px]" type="checkbox" checked={ids.includes(p.id)} disabled={!ids.includes(p.id) && ids.length >= MAX_SELECTION} onChange={() => toggle(p.id)} /><span>{p.manufacturer} · {p.name}</span></label>)}</div>
    </fieldset>
    <fieldset className="rounded-card border border-line p-[20px]"><legend className="px-[8px] text-f18 font-semibold">2. Project brief</legend>
      <p className="mb-[16px] text-f14 text-ink-2">Required fields are marked *. For custom GFRP or UHPC, include geometry, drawing revision, panelization and fixing conditions. Attach files in your email application after opening the draft.</p>
      <div className="grid gap-[16px] md:grid-cols-2">{fields.map(field => <label key={field.id} className="text-f14 font-medium" htmlFor={`request-${field.id}`}>{field.label}{field.required ? " *" : ""}<input id={`request-${field.id}`} name={field.id} required={field.required} type={field.type || "text"} maxLength={field.id === "drawings" ? 500 : 180} className={inputClass} value={values[field.id] || ""} onChange={e => change(field.id, e.target.value)} /></label>)}
        <label className="text-f14 font-medium">Your role<select className={inputClass} value={values.role || ""} onChange={e => change("role", e.target.value)}><option value="">Select role</option>{["Architect / designer", "Procurement / developer", "Contractor / installer", "Fabricator / distributor", "Other project participant"].map(v => <option key={v}>{v}</option>)}</select></label>
        <label className="text-f14 font-medium">Project stage<select className={inputClass} value={values.stage || ""} onChange={e => change("stage", e.target.value)}><option value="">Select stage</option>{["Concept / material selection", "Design development", "Technical review / specification", "Tender / procurement", "Approved for order", "Construction / replacement"].map(v => <option key={v}>{v}</option>)}</select></label>
        <label className="text-f14 font-medium md:col-span-2">Application and required performance / documents<textarea className={inputClass} rows={3} maxLength={1500} value={values.requirements || ""} onChange={e => change("requirements", e.target.value)} placeholder="Location of use, fire or environmental requirements, technical data, CAD/BIM needs, reports to review…" /></label>
        <label className="text-f14 font-medium md:col-span-2">Additional scope / sample destination / commercial requirements<textarea className={inputClass} rows={3} maxLength={1500} value={values.notes || ""} onChange={e => change("notes", e.target.value)} placeholder="Sample size and purpose, mold ownership, packaging, delivery terms, or other project questions…" /></label>
      </div>
    </fieldset>
    <div className="rounded-card border border-line bg-paper-2 p-[20px]"><h2 className="text-f18 font-semibold">3. Review and email Cladvera</h2><p className="my-[12px] text-f14 text-ink-2">This page prepares a brief for {site.contact.email}. You send it from your email application. Product availability, sample cost, timing and delivery terms are confirmed in the response.</p><p className="mb-[16px] text-f12 text-ink-3">Contact details stay in this form while you prepare the draft. Only product IDs are saved in this browser.</p>
      <button type="submit" className="rounded-control bg-accent px-[18px] py-[10px] font-semibold text-paper">Prepare email brief</button>
      {prepared && <div className="mt-[20px]"><label className="text-f14 font-semibold" htmlFor="email-brief">Email brief preview</label><textarea id="email-brief" className={`${inputClass} font-mono`} rows={15} readOnly value={body} /><div className="mt-[16px] flex flex-wrap gap-[12px]"><a href={mailto} className="rounded-control bg-accent px-[18px] py-[10px] font-semibold text-paper">Open email draft</a><button type="button" className="rounded-control border border-line-strong px-[18px] py-[10px]" onClick={async () => { try { await navigator.clipboard.writeText(body); setStatus("Brief copied. Paste it into an email to sales@cladvera.com."); } catch { setStatus("Copy the text from the email brief preview above."); } }}>Copy brief</button><button type="button" className="rounded-control border border-line-strong px-[18px] py-[10px]" onClick={() => { const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = "cladvera-project-brief.txt"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }}>Download brief</button></div><p className="mt-[12px] text-f12 text-ink-3">If your email app cannot open a long draft, copy or download the brief and attach it to an email. Preparing a brief does not send it.</p></div>}
      <p role="status" className="mt-[12px] text-f14 text-accent">{status}</p>
    </div>
  </form>;
}
