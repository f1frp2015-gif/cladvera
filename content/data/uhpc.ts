/** Original design-inquiry categories. Product capabilities remain unverified. */
export const uhpcCollectionPath = "/materials/uhpc-panels";

export type UhpcProductSlug =
  | "facade-panels"
  | "aggregate-panels"
  | "textured-panels"
  | "custom-elements"
  | "attachment-components";

export interface UhpcProduct {
  id: string;
  slug: UhpcProductSlug;
  name: string;
  type: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  designIntent: string;
  brief: Array<{ title: string; body: string }>;
  confirmations: string[];
}

export const uhpcProducts: UhpcProduct[] = [
  {
    id: "uhpc-facade",
    slug: "facade-panels",
    name: "UHPC facade panels",
    type: "Architectural concrete panel inquiry",
    summary: "Develop a project brief for architectural ultra-high performance concrete cladding. Panel construction, finish, manufacturer and technical evidence are to be confirmed for the proposed supply.",
    metaTitle: "UHPC Facade Panel Design Inquiries | Cladvera",
    metaDescription: "Plan an architectural UHPC facade panel inquiry with Cladvera. Define panel layout, surface intent and the product evidence needed for project review.",
    designIntent: "Start with the elevation: the scale of the panel, the rhythm of the joints and the relationship between solid surfaces and openings. These choices form the design brief; they do not establish an available panel size or an approved wall assembly.",
    brief: [
      { title: "Describe the panel layout", body: "Provide elevations with proposed panel boundaries, openings, visible edges and corner conditions. Identify repeated and unique pieces, and distinguish the desired joint pattern from dimensions already fixed by the supporting structure." },
      { title: "Define the appearance", body: "Describe the intended color family, surface character and viewing distance in your own project language. Request a physical sample from the proposed source before approving an appearance reference; the illustration on this page is only a geometric study." },
      { title: "Coordinate the supporting wall", body: "Share the substrate, cavity intent, insulation zones and project design criteria. Ask the appointed engineer to review the proposed panel and connection together, including movement, tolerances and interfaces with adjacent construction." },
    ],
    confirmations: [
      "Named manufacturer, product designation and manufacturing origin.",
      "Confirmed panel composition, dimensions, weight and fabrication limits.",
      "Relevant product and wall-assembly evidence for the project location.",
      "Approved connection design, sample, drawing revision and supply scope.",
    ],
  },
  {
    id: "uhpc-aggregate",
    slug: "aggregate-panels",
    name: "Aggregate-finish UHPC panels",
    type: "Aggregate surface design inquiry",
    summary: "Describe an architectural concrete surface with visible aggregate for supplier feasibility review. Aggregate selection, surface treatment and the offered panel construction are to be confirmed.",
    metaTitle: "Aggregate-Finish UHPC Panel Inquiries | Cladvera",
    metaDescription: "Develop an aggregate-finish UHPC panel brief. Review surface intent, sample approval and the manufacturer evidence required before project specification.",
    designIntent: "An aggregate surface brief should distinguish the desired overall tone from the visible character of individual particles. Describe the appearance at both close range and across the elevation, allowing the proposed supplier to assess what can be produced and sampled.",
    brief: [
      { title: "Write the surface brief", body: "Describe the intended background color, aggregate character and distribution. Use original project references or materials you are authorized to share. A visual preference is a request for development, not confirmation of a stocked finish." },
      { title: "Agree a sample review", body: "Ask for a sample from the actual proposed source and record how it will be assessed under the project's lighting conditions. Agree how variation, edges and joins will be reviewed before accepting a production appearance reference." },
      { title: "Connect finish and panel design", body: "Include the panel layout, exposed edges and anticipated maintenance access with the surface brief. Request confirmation of the proposed treatment, care requirements and compatibility with the specified panel and connection design." },
    ],
    confirmations: [
      "Manufacturer and offered concrete panel formulation.",
      "Feasible aggregate selection, surface treatment and sample availability.",
      "Agreed appearance reference, acceptable variation and care guidance.",
      "Independent review of product evidence and project attachment details.",
    ],
  },
  {
    id: "uhpc-textured",
    slug: "textured-panels",
    name: "Textured UHPC panels",
    type: "Surface relief design inquiry",
    summary: "Explore a project-specific surface relief through drawings and sample development. Texture geometry, tooling, panel construction and manufacturing feasibility remain to be confirmed.",
    metaTitle: "Textured UHPC Panel Design Inquiries | Cladvera",
    metaDescription: "Prepare a textured UHPC panel inquiry with original surface geometry, joint intent and sample requirements. Product capabilities are confirmed by project.",
    designIntent: "Use a relief study to explore how a surface changes with viewpoint and light. Define the pattern through original drawings and explain where it begins, repeats and stops. Keep the desired visual effect separate from product performance, which requires its own evidence.",
    brief: [
      { title: "Define an original pattern", body: "Provide a drawing or model showing the proposed relief, direction and repeat. Identify the design owner and confirm permission to reproduce any supplied pattern. The supplier must review tooling and production feasibility before the geometry is accepted." },
      { title: "Resolve the transitions", body: "Mark how the pattern meets panel joints, edges, corners and openings. Show whether adjoining pieces should align or change direction, and identify the views that matter most for evaluating the finished elevation." },
      { title: "Set the mock-up questions", body: "Use a physical mock-up to review the proposed relief, surface finish and joint alignment. Define the approval reference and record the drawing revision. Ask separately for cleaning guidance and evidence relevant to the intended exposure." },
    ],
    confirmations: [
      "Design ownership or permission for the proposed surface pattern.",
      "Manufacturer, feasible relief geometry and tooling scope.",
      "Sample or mock-up approval and acceptable production variation.",
      "Product-specific performance evidence, care guidance and connection design.",
    ],
  },
  {
    id: "uhpc-custom",
    slug: "custom-elements",
    name: "Custom UHPC elements",
    type: "Architectural form development inquiry",
    summary: "Prepare a brief for project-specific architectural concrete forms. Geometry, molds, handling, connections and the manufacturing source require a coordinated feasibility review.",
    metaTitle: "Custom UHPC Architectural Elements | Cladvera",
    metaDescription: "Brief custom UHPC architectural elements with Cladvera. Coordinate original geometry, tooling questions, mock-ups and project-specific evidence for review.",
    designIntent: "A custom element starts with the architectural role of the piece and the interfaces around it. Provide enough geometry to explain the intent while identifying the dimensions that are still open to development. Feasibility and supply scope are confirmed before tooling is authorized.",
    brief: [
      { title: "Share the geometry and interfaces", body: "Provide original drawings or a model with the visible faces, adjoining construction and required connection zones identified. Clarify whether the element is intended only as cladding or has another project role requiring separate engineering review." },
      { title: "Identify repetition and tooling", body: "List the unique shapes and expected quantities, including mirrored pieces and variations. Ask the proposed supplier to explain the tooling scope, revision process and feasibility constraints before agreeing a development schedule." },
      { title: "Plan the review and handling", body: "Define what a prototype or mock-up must demonstrate: appearance, geometry, joint alignment or connection access. Include lifting, transport and installation constraints in the brief so these can be reviewed alongside the final element design." },
    ],
    confirmations: [
      "Manufacturer, intended element role and design responsibilities.",
      "Accepted geometry, manufacturing feasibility and tooling ownership.",
      "Project-engineered connection, handling and installation provisions.",
      "Approved prototype, product evidence and commercial development scope.",
    ],
  },
  {
    id: "uhpc-attachments",
    slug: "attachment-components",
    name: "Panel attachment components",
    type: "Connection coordination inquiry",
    summary: "Coordinate an attachment inquiry around the proposed concrete panel and supporting wall. Component manufacturer, panel compatibility and engineered capacity are to be confirmed.",
    metaTitle: "UHPC Panel Attachment Inquiries | Cladvera",
    metaDescription: "Prepare a UHPC panel attachment inquiry. Identify the proposed panel, substrate and design criteria for project-specific component and engineering review.",
    designIntent: "The connection brief links the panel design to the supporting structure. Describe access, alignment and movement requirements alongside the intended appearance of the facade. A component category alone does not establish compatibility with a panel or a verified load path.",
    brief: [
      { title: "Identify the actual panel", body: "Provide the proposed manufacturer's panel designation and the latest panel drawings when available. Include geometry, edge conditions and any planned panel preparation so the connection review is tied to the actual product under consideration." },
      { title: "Describe the supporting structure", body: "State the substrate, proposed cavity, insulation arrangement and construction tolerances. Supply the project design criteria from the responsible engineer, including movement and exposure requirements relevant to the connection." },
      { title: "Request a coordinated schedule", body: "Ask for the component manufacturer, material, associated installation instructions and evidence supporting the proposed connection. The project engineer must review the complete arrangement before components or panel preparation are approved." },
    ],
    confirmations: [
      "Named panel and component manufacturers with traceable product designations.",
      "Documented panel-to-component compatibility for the proposed arrangement.",
      "Project-engineered loads, substrate connections and movement allowances.",
      "Approved drawings, installation sequence and inspection requirements.",
    ],
  },
];

export function findUhpcProduct(slug: UhpcProductSlug) {
  return uhpcProducts.find(product => product.slug === slug)!;
}
