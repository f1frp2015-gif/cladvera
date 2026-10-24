"use client";

import { useEffect, useRef, useState, type FormEvent, type HTMLInputTypeAttribute } from "react";
import { catalogProducts, MAX_SELECTION } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";
import { site } from "@/content/data/site";

const inputClass = "mt-[8px] min-h-[48px] w-full min-w-0 rounded-none border-0 border-b border-line-strong bg-paper-2 px-[12px] py-[12px] text-f16 font-normal md:text-f14";
// Mirrors the limits in cloudflare/inquiry-relay/src/index.js.
const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;
const FILE_EXTENSIONS = ["pdf", "dwg", "dxf", "xlsx", "xls", "csv", "doc", "docx", "zip", "png", "jpg", "jpeg", "webp", "heic", "rvt", "skp", "ifc", "step", "stp"];
type RequestField = { id: string; label: string; required?: boolean; type?: HTMLInputTypeAttribute; autoComplete?: string };
const fields: RequestField[] = [
  { id: "name", label: "Your name", required: true, autoComplete: "name" },
  { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "location", label: "Project location (city, country)" },
];
const requestKinds = [
  { value: "quote", label: "Project quote" },
  { value: "sample", label: "Samples / mock-up" },
  { value: "documents", label: "Technical documents" },
];
type Status = { state: "idle" } | { state: "sending"; progress: number } | { state: "sent"; reference: string } | { state: "error"; message: string };
type RelayReply = { ok?: boolean; ref?: string; error?: string };

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function fetchToken() {
  return fetch(`${site.contact.relay}/token`, { cache: "no-store" })
    .then(res => (res.ok ? (res.json() as Promise<{ token?: string }>) : { token: "" }))
    .then(json => json.token ?? "")
    .catch(() => "");
}
// XMLHttpRequest rather than fetch, for upload progress on large drawing sets.
function postInquiry(data: FormData, onProgress: (percent: number) => void) {
  return new Promise<RelayReply>(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${site.contact.relay}/inquiry`);
    xhr.responseType = "json";
    xhr.upload.onprogress = event => { if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100)); };
    xhr.onload = () => resolve((xhr.response as RelayReply | null) ?? { ok: false });
    xhr.onerror = () => resolve({ ok: false, error: "Network error. Please check your connection and try again." });
    xhr.send(data);
  });
}

export default function ProjectRequest({ initialIds, intent }: { initialIds?: string[]; intent: string }) {
  const { ids: savedIds, setSelection } = useSelection();
  const [chosen, setChosen] = useState(initialIds);
  const ids = chosen ?? savedIds;
  const [kind, setKind] = useState(intent === "sample" ? "sample" : intent === "documents" ? "documents" : "quote");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const token = useRef<Promise<string> | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const products = ids.flatMap(id => catalogProducts.filter(p => p.id === id));
  const available = catalogProducts.filter(p => !ids.includes(p.id));
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  const sending = status.state === "sending";

  // The relay only accepts a form whose signed token is a few seconds old, so fetch it as the page opens.
  useEffect(() => { token.current = fetchToken(); }, []);

  function chooseProducts(next: string[]) {
    setChosen(next);
    setSelection(next);
  }
  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    let error = "";
    for (const file of Array.from(list)) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!FILE_EXTENSIONS.includes(ext)) { error = `${file.name}: .${ext} files are not accepted.`; continue; }
      if (next.some(f => f.name === file.name && f.size === file.size)) continue;
      if (next.length >= MAX_FILES) { error = `Attach at most ${MAX_FILES} files.`; break; }
      if (next.reduce((sum, f) => sum + f.size, 0) + file.size > MAX_TOTAL_BYTES) { error = `${file.name} would take the files over 15 MB. Add a download link to the project details instead.`; continue; }
      next.push(file);
    }
    setFiles(next);
    setFileError(error);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending", progress: 0 });
    const data = new FormData(form);
    data.set("kind", kind);
    data.set("page", `${window.location.pathname}${window.location.search}`);
    for (const p of products) data.append("products", `${p.manufacturer} / ${p.name} - ${site.url}${p.path}`);
    for (const file of files) data.append("files", file, file.name);
    let signed = await (token.current ?? fetchToken());
    if (!signed) signed = await (token.current = fetchToken());
    data.set("token", signed);
    const reply = await postInquiry(data, progress => setStatus({ state: "sending", progress }));
    if (reply.ok && reply.ref) {
      setStatus({ state: "sent", reference: reply.ref });
      form.reset();
      setFiles([]);
      token.current = fetchToken();
    } else {
      setStatus({ state: "error", message: reply.error || "The request could not be sent." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="max-w-[680px] border-t border-ink pt-[24px]">
        <p className="font-mono text-f12 text-accent">REQUEST SENT · {status.reference}</p>
        <h2 className="mt-[14px] text-[28px] leading-[1.12] tracking-[-0.04em]">Thank you. Your request is with our team.</h2>
        <p className="mt-[16px] text-f16 leading-[1.8] text-ink-2">We reply by email, normally within {site.contact.replyTime}. Quote the reference above if you write to us about this project.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-[24px] flex min-h-[48px] items-center justify-center border border-line-strong px-[18px] py-[12px] text-f14 transition-colors hover:border-ink">Send another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative grid min-w-0 gap-[28px] border-t border-ink pt-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[56px]">
      <div>
        <p className="mb-[14px] font-mono text-f12 text-accent">YOUR PROJECT</p>
        <h2 className="text-[28px] leading-[1.12] tracking-[-0.04em]">Details and<br className="hidden lg:block" /> drawings.</h2>
        <p className="mt-[16px] max-w-[420px] text-f14 leading-[1.8] text-ink-2">Required fields are marked *. Your files are emailed to our team with the request.</p>
      </div>
      <div className="grid min-w-0 gap-[28px]">
        <fieldset className="min-w-0">
          <legend className="mb-[12px] text-f14 font-medium">Request type</legend>
          <div className="grid border-t border-line-strong sm:grid-cols-3">
            {requestKinds.map(option => (
              <label key={option.value} className={`flex cursor-pointer items-center gap-[10px] border-b border-line-strong px-[12px] py-[14px] text-f14 ${kind === option.value ? "bg-paper-2 font-medium" : "hover:bg-paper-2/60"}`}>
                <input type="radio" name="intent" value={option.value} checked={kind === option.value} className="h-[16px] w-[16px] shrink-0 accent-accent" onChange={() => setKind(option.value)} />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="min-w-0">
          <label className="text-f14 font-medium" htmlFor="request-product">Products <span className="font-normal text-ink-3">(optional, up to {MAX_SELECTION})</span></label>
          {products.length > 0 && (
            <ul className="mt-[10px] flex flex-wrap gap-[8px]">
              {products.map(p => (
                <li key={p.id} className="inline-flex min-w-0 items-center gap-[6px] border border-line-strong bg-paper-2 py-[4px] pl-[12px] pr-[4px] text-f14">
                  <span className="min-w-0"><span className="text-ink-3">{p.manufacturer} · </span>{p.name}</span>
                  <button type="button" aria-label={`Remove ${p.name}`} onClick={() => chooseProducts(ids.filter(id => id !== p.id))} className="flex h-[32px] w-[32px] shrink-0 items-center justify-center text-ink-2 hover:text-accent">×</button>
                </li>
              ))}
            </ul>
          )}
          {ids.length < MAX_SELECTION && (
            <select id="request-product" className={inputClass} value="" onChange={event => { if (event.target.value) chooseProducts([...ids, event.target.value]); }}>
              <option value="">{products.length ? "Add another product" : "Select a product, or describe it below"}</option>
              {[...new Set(available.map(p => p.manufacturer))].map(manufacturer => (
                <optgroup key={manufacturer} label={manufacturer}>
                  {available.filter(p => p.manufacturer === manufacturer).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </optgroup>
              ))}
            </select>
          )}
        </div>

        <div className="grid min-w-0 gap-x-[24px] gap-y-[20px] md:grid-cols-2">
          {fields.map(field => (
            <label key={field.id} className="min-w-0 text-f14 font-medium" htmlFor={`request-${field.id}`}>
              {field.label}{field.required ? " *" : ""}
              <input id={`request-${field.id}`} name={field.id} required={field.required} type={field.type || "text"} autoComplete={field.autoComplete ?? "off"} maxLength={180} className={inputClass} />
            </label>
          ))}
        </div>

        <label className="min-w-0 text-f14 font-medium" htmlFor="request-message">
          Project details{files.length === 0 ? " *" : ""}
          <textarea id="request-message" name="message" required={files.length === 0} rows={5} maxLength={6000} className={inputClass} placeholder="Quantity (m², ft² or pieces), sizes or thickness, finish or colour, schedule, delivery destination, documents you need…" />
        </label>

        <div className="min-w-0">
          <label className="text-f14 font-medium" htmlFor="request-files">Drawings and documents</label>
          <div
            onDragOver={event => { event.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={event => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}
            className={`mt-[8px] border border-dashed px-[16px] py-[22px] text-center ${dragging ? "border-accent bg-paper-2" : "border-line-strong"}`}
          >
            <p className="text-f14">Drag files here or <button type="button" onClick={() => fileInput.current?.click()} className="min-h-[44px] text-accent underline underline-offset-4">choose files</button></p>
            <p className="mt-[4px] text-f12 leading-[1.7] text-ink-3">Up to {MAX_FILES} files, 15 MB in total. PDF, DWG, DXF, Excel, Word, ZIP, images, RVT, SKP, IFC or STEP. For larger sets, add a download link to the project details.</p>
            <input ref={fileInput} id="request-files" type="file" multiple accept={FILE_EXTENSIONS.map(ext => `.${ext}`).join(",")} className="sr-only" onChange={event => { addFiles(event.target.files); event.target.value = ""; }} />
          </div>
          {files.length > 0 && (
            <ul className="mt-[10px] grid gap-[4px]">
              {files.map(file => (
                <li key={`${file.name}-${file.size}`} className="flex min-w-0 items-center justify-between gap-[12px] border-b border-line py-[4px] text-f14">
                  <span className="min-w-0 truncate">{file.name} <span className="text-ink-3">· {formatSize(file.size)}</span></span>
                  <button type="button" aria-label={`Remove ${file.name}`} onClick={() => { setFiles(files.filter(f => f !== file)); setFileError(""); }} className="flex h-[32px] w-[32px] shrink-0 items-center justify-center text-ink-2 hover:text-accent">×</button>
                </li>
              ))}
              <li className="pt-[4px] font-mono text-f12 text-ink-3">{files.length} / {MAX_FILES} FILES · {formatSize(totalBytes)} / 15 MB</li>
            </ul>
          )}
          {fileError && <p role="alert" className="mt-[8px] text-f12 text-accent">{fileError}</p>}
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
          <label>Company website<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="min-w-0">
          <button type="submit" disabled={sending} className="inline-flex min-h-[52px] w-full items-center justify-between gap-[24px] bg-ink px-[20px] py-[14px] text-f14 font-medium text-paper transition-colors hover:bg-accent disabled:opacity-70 sm:w-auto">
            {sending ? `Sending${files.length ? ` ${status.progress}%` : "…"}` : "Send request"} <span aria-hidden="true">↗</span>
          </button>
          <p className="mt-[12px] max-w-[680px] text-f12 leading-[1.8] text-ink-3">Your request goes to <span className="break-all">{site.contact.email}</span>. Availability, sample cost, timing and delivery terms are confirmed in our reply.</p>
          <p role="status" className="mt-[12px] text-f14 leading-[1.7] text-accent">
            {status.state === "error" && <>{status.message} You can also email <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a> with your files.</>}
          </p>
        </div>
      </div>
    </form>
  );
}
