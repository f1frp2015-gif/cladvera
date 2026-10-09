import { catalogApplications, catalogCategories, catalogProducts } from "./catalog";

export interface ResourceFilters {
  q?: string;
  category?: string;
  application?: string;
  availability?: string;
}

export const resourceAvailability = [
  { id: "linked", label: "Source file linked" },
  { id: "request", label: "Documents by request" },
] as const;

export function filterTechnicalResources(filters: ResourceFilters = {}) {
  const normalize = (value: string) => value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const terms = normalize(filters.q || "").split(" ").filter(Boolean);

  return catalogProducts.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.application && !product.applications.includes(filters.application)) return false;
    const availability = product.documentUrl ? "linked" : "request";
    if (filters.availability && filters.availability !== availability) return false;

    // A source page provides context; only documentUrl counts as a linked file.
    const searchable = normalize([
      product.name, product.manufacturer, product.selectionType, product.summary, product.construction,
      product.documentation, product.documentLabel,
      catalogCategories.find(category => category.id === product.category)?.label,
      ...product.applications.map(id => catalogApplications.find(application => application.id === id)?.label),
    ].join(" "));
    return terms.every(term => searchable.includes(term));
  });
}
