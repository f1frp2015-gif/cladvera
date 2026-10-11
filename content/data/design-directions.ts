/** Editorial starting points, not performance recommendations or finish SKUs. */
export const designDirections = [
  {
    id: "mineral", label: "Mineral & tactile", title: "Let the surface catch the light.",
    description: "Explore architectural concrete through texture, aggregate and the relationship between a panel and its joints.",
    question: "How should texture read from the street, and at arm’s length?",
    review: "Compare physical samples in the intended light. Coordinate panel divisions, corner details and the attachment system.",
    productIds: ["taktl-facade", "taktl-korsa"], imageProductId: "taktl-korsa", category: "uhpc", collection: "/suppliers/taktl",
  },
  {
    id: "planar", label: "Precise & planar", title: "Find a rhythm in the facade.",
    description: "Begin with metal-faced composite panels, then consider the scale of the module, the finish and the expression of each joint.",
    question: "Will the facade read as a continuous plane or a series of modules?",
    review: "Confirm face metal, core and finish for the proposed panel. Review flatness, joint layout and evidence for the complete assembly.",
    productIds: ["almine-a2"], imageProductId: "almine-a2", category: "mcm", collection: "/materials/acm-panels",
  },
  {
    id: "layered", label: "Warm & layered", title: "Give the surface a sense of warmth.",
    description: "Explore decorative laminate and interior board families. Start by distinguishing the exterior exposure from the interior setting.",
    question: "How will tone, grain direction and joints relate to the space?",
    review: "Request the actual finish range and physical samples. Exterior and interior products have different constructions and review requirements.",
    productIds: ["compactwood-exterior", "compactwood-interior"], imageProductId: "compactwood-exterior", category: "hpl", collection: "/materials/exterior-hpl-panels",
  },
  {
    id: "sculptural", label: "Sculptural & custom", title: "Start with the geometry.",
    description: "Consider molded GFRP and custom UHPC as distinct material routes for architectural forms developed around the project.",
    question: "Where should the form divide into buildable, transportable pieces?",
    review: "Bring drawings or a 3D model. Review modules, tooling, finish, connections and prototypes with the project team.",
    productIds: ["gfrp-custom", "taktl-custom"], imageProductId: "gfrp-custom", category: "gfrp", collection: "/materials/gfrp-custom-elements",
  },
] as const;
