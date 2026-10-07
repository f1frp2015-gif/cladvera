"use client";

import { useState } from "react";
import { materials } from "@/content/data/materials";
import { site } from "@/content/data/site";
import { CheckboxGroup, Field, FormSection, Select, SpamGuards, SubmitResult, TextArea, submitInquiry, type SubmitState } from "./fields";

const yesNo = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "unsure", label: "Not sure" },
];

export default function QuoteRequestForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  return (
    <form
      className="relative grid gap-[16px]"
      encType="multipart/form-data"
      onSubmit={async (event) => {
        event.preventDefault();
        setState({ status: "submitting" });
        const result = await submitInquiry(event.currentTarget);
        setState(result);
        if (result.status === "done") event.currentTarget.reset();
      }}
    >
      <input type="hidden" name="kind" value="quote" />
      <SpamGuards />

      <FormSection step={1} title="Project">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field label="Project name" name="project" required />
          <Field label="City and state or province" name="location" required />
          <Select
            label="Building type"
            name="building_type"
            options={[
              { value: "commercial", label: "Commercial or mixed use" },
              { value: "hospitality", label: "Hotel or hospitality" },
              { value: "retail", label: "Retail or showroom" },
              { value: "institutional", label: "Education, healthcare or civic" },
              { value: "multifamily", label: "Multifamily residential" },
              { value: "other", label: "Other" },
            ]}
          />
          <Select
            label="Stage"
            name="stage"
            required
            options={[
              { value: "design", label: "Design" },
              { value: "bid", label: "Bid" },
              { value: "awarded", label: "Awarded" },
              { value: "construction", label: "In construction" },
            ]}
          />
          <Field label="Target delivery" name="delivery_date" type="month" />
          <Select
            label="Public funding"
            name="public_funding"
            required
            hint="Projects subject to Buy American, BABA or Buy Canadian rules cannot use these products."
            options={[
              { value: "no", label: "No federal, state or provincial funding" },
              { value: "yes", label: "Yes, publicly funded or procured" },
              { value: "unsure", label: "Not sure" },
            ]}
          />
        </div>
      </FormSection>

      <FormSection step={2} title="Scope">
        <CheckboxGroup legend="Materials" name="materials" options={materials.map((m) => ({ value: m.slug, label: m.shortName }))} />
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field label="Finish codes" name="finish_codes" placeholder="e.g. HP-NO11, AC-CH02" />
          <Field label="Thickness" name="thickness" placeholder="e.g. 8 mm" />
          <Field label="Estimated area" name="area" required placeholder="e.g. 12,000 ft² or 1,100 m²" />
          <Select
            label="Supply mode"
            name="supply_mode"
            required
            options={[
              { value: "sheets", label: "Full sheets" },
              { value: "cut", label: "Cut to size" },
              { value: "fabricated", label: "Fabricated panels (routed and returned)" },
            ]}
          />
          <Select
            label="Use"
            name="use"
            required
            options={[
              { value: "interior", label: "Interior" },
              { value: "exterior", label: "Exterior" },
              { value: "both", label: "Both" },
            ]}
          />
          <Field label="Number of different finishes" name="finish_count" type="number" />
          <Field label="Attachment system" name="system" placeholder="e.g. exposed-fastener rainscreen" />
          <Select label="Includes real wood veneer" name="veneer" options={yesNo} hint="Triggers Lacey Act and formaldehyde documentation." />
        </div>
      </FormSection>

      <FormSection step={3} title="Drawings and specification">
        <div>
          <label htmlFor="f-files" className="block text-f14 font-medium text-ink">
            Elevations, panel schedules or cut lists
          </label>
          <input
            id="f-files"
            name="files"
            type="file"
            multiple
            accept=".pdf,.dwg,.dxf,.xlsx,.xls,.csv,.zip,.png,.jpg,.jpeg,.rvt,.skp"
            className="mt-[6px] block w-full text-f14"
          />
          <p className="mt-[4px] text-f12 text-ink-3">Up to 3 files, 10 MB each. PDF, DWG, DXF, XLSX, ZIP or images.</p>
        </div>
        <Field label="Specification section" name="spec_section" placeholder="e.g. 07 42 43 Composite Wall Panels" />
      </FormSection>

      <FormSection step={4} title="Commercial terms">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Select
            label="Preferred Incoterm"
            name="incoterm"
            required
            options={[
              { value: "FOB", label: "FOB China port" },
              { value: "CIF", label: "CIF or CFR destination port" },
              { value: "DAP", label: "DAP job site or warehouse" },
              { value: "stock", label: "Ex North American stock (when available)" },
            ]}
          />
          <Field label="Destination port or address" name="destination" />
          <Select
            label="Importer of record"
            name="importer"
            required
            options={[
              { value: "self", label: "We import on our own account" },
              { value: "broker", label: "We have a customs broker" },
              { value: "help", label: "We need help arranging import" },
            ]}
          />
          <Select
            label="Payment preference"
            name="payment"
            options={[
              { value: "tt", label: "T/T deposit and balance" },
              { value: "lc", label: "Letter of credit" },
              { value: "discuss", label: "To discuss" },
            ]}
          />
          <Select label="Compliance document pack needed" name="doc_pack" options={yesNo} />
          <Select label="Mock-up or sample wall needed" name="mockup" options={yesNo} />
          <Select label="Private label" name="private_label" options={yesNo} />
        </div>
      </FormSection>

      <FormSection step={5} title="Contact">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field label="Name" name="name" required autoComplete="name" />
          <Field label="Company" name="company" required autoComplete="organization" />
          <Select
            label="Role"
            name="role"
            required
            options={[
              { value: "fabricator", label: "Fabricator" },
              { value: "distributor", label: "Distributor" },
              { value: "contractor", label: "General or facade contractor" },
              { value: "architect", label: "Architect or designer" },
              { value: "owner", label: "Owner or developer" },
              { value: "other", label: "Other" },
            ]}
          />
          <Select
            label="Country"
            name="country"
            required
            options={[
              { value: "US", label: "United States" },
              { value: "CA", label: "Canada" },
              { value: "other", label: "Other" },
            ]}
          />
          <Field label="Work email" name="email" type="email" required autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
          <Select
            label="Preferred channel"
            name="channel"
            options={[
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
              { value: "whatsapp", label: "WhatsApp" },
            ]}
          />
        </div>
        <TextArea label="Anything else" name="message" rows={3} />
      </FormSection>

      <div className="flex flex-wrap items-center gap-[12px]">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="rounded-control bg-accent px-[18px] py-[10px] text-f14 font-semibold text-paper hover:bg-accent-hover disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : "Submit project details"}
        </button>
        <p className="text-f12 text-ink-3">Quotes with drawings in two business days; budget ranges in one.</p>
      </div>
      <SubmitResult state={state} email={site.contact.email} />
    </form>
  );
}
