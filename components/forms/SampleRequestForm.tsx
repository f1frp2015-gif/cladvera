"use client";

import { useState } from "react";
import { finishes } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { site } from "@/content/data/site";
import { CheckboxGroup, Field, FormSection, Select, SpamGuards, SubmitResult, TextArea, submitInquiry, type SubmitState } from "./fields";

const roles = [
  { value: "architect", label: "Architect or interior designer" },
  { value: "fabricator", label: "Fabricator" },
  { value: "distributor", label: "Distributor" },
  { value: "contractor", label: "General or facade contractor" },
  { value: "other", label: "Other" },
];

export default function SampleRequestForm({ preselected = [] as string[] }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  return (
    <form
      className="relative grid gap-[16px]"
      onSubmit={async (event) => {
        event.preventDefault();
        setState({ status: "submitting" });
        const result = await submitInquiry(event.currentTarget);
        setState(result);
        if (result.status === "done") event.currentTarget.reset();
      }}
    >
      <input type="hidden" name="kind" value="sample" />
      <SpamGuards />

      <FormSection step={1} title="Who you are">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field label="Name" name="name" required autoComplete="name" />
          <Field label="Company" name="company" required autoComplete="organization" />
          <Field label="Work email" name="email" type="email" required autoComplete="email" hint="Industry and A&D company addresses are verified within 48 hours." />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
          <Select label="Role" name="role" required options={roles} />
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
        </div>
      </FormSection>

      <FormSection step={2} title="Shipping address">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field label="Street address" name="address" required autoComplete="street-address" />
          <Field label="City" name="city" required autoComplete="address-level2" />
          <Field label="State or province" name="region" required autoComplete="address-level1" />
          <Field label="ZIP or postal code" name="postal" required autoComplete="postal-code" />
        </div>
      </FormSection>

      <FormSection step={3} title="What to include">
        <CheckboxGroup legend="Materials" name="materials" options={materials.map((m) => ({ value: m.slug, label: m.shortName }))} />
        <fieldset>
          <legend className="text-f14 font-medium text-ink">Finishes (up to 10)</legend>
          <div className="mt-[8px] grid gap-[6px] sm:grid-cols-2 lg:grid-cols-3">
            {finishes.map((f) => (
              <label key={f.code} className="flex items-center gap-[8px] text-f14 text-ink-2">
                <input type="checkbox" name="finishes" value={f.code} defaultChecked={preselected.includes(f.code)} className="h-[16px] w-[16px] accent-accent" />
                <span>
                  <span className="font-mono text-f12 text-ink-3">{f.code}</span> {f.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Select
          label="Sample type"
          name="sample_type"
          options={[
            { value: "chips", label: "Colour chips (free)" },
            { value: "range", label: "Range set for natural veneer or UHPC" },
            { value: "panel", label: "A4 or 12 × 12 in confirmation panel (charged, credited on order)" },
          ]}
        />
      </FormSection>

      <FormSection step={4} title="Project (optional)">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field label="Project name" name="project" />
          <Select
            label="Stage"
            name="stage"
            options={[
              { value: "concept", label: "Concept" },
              { value: "design", label: "Design development" },
              { value: "bid", label: "Bidding" },
              { value: "awarded", label: "Awarded" },
            ]}
          />
          <Select
            label="Use"
            name="use"
            options={[
              { value: "interior", label: "Interior" },
              { value: "exterior", label: "Exterior" },
              { value: "both", label: "Both" },
            ]}
          />
          <Field label="Approximate area" name="area" placeholder="e.g. 8,000 ft² or 750 m²" />
        </div>
        <TextArea label="Notes" name="message" rows={3} />
      </FormSection>

      <div className="flex flex-wrap items-center gap-[12px]">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="rounded-control bg-accent px-[18px] py-[10px] text-f14 font-semibold text-paper hover:bg-accent-hover disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : "Request a sample set"}
        </button>
        <p className="text-f12 text-ink-3">Verified requests ship within two business days.</p>
      </div>
      <SubmitResult state={state} email={site.contact.email} />
    </form>
  );
}
