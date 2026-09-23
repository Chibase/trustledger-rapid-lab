import type { Dimension } from "./types";

export const DIMENSIONS: Dimension[] = [
  {
    id: "stakeholder-coverage",
    name: "Stakeholder Coverage",
    shortName: "Stakeholder Coverage",
    description:
      "The breadth and completeness of stakeholder identification, including directly and indirectly affected parties and vulnerable groups.",
    order: 1,
  },
  {
    id: "community-participation",
    name: "Community Participation",
    shortName: "Community Participation",
    description:
      "The degree to which affected communities are consulted, participate in decisions, and have ongoing voice in project governance.",
    order: 2,
  },
  {
    id: "engagement-quality",
    name: "Engagement Quality",
    shortName: "Engagement Quality",
    description:
      "The quality, appropriateness, and accessibility of engagement processes — language, venue, documentation, and cultural competency.",
    order: 3,
  },
  {
    id: "grievance-readiness",
    name: "Grievance Readiness",
    shortName: "Grievance Readiness",
    description:
      "The maturity of grievance mechanisms — accessibility, responsiveness, tracking, and feedback loops to complainants.",
    order: 4,
  },
  {
    id: "transparency-commitments",
    name: "Transparency & Commitments",
    shortName: "Transparency & Commitments",
    description:
      "Public disclosure of project plans, impacts, and benefits, and the maintenance and tracking of commitments to stakeholders.",
    order: 5,
  },
  {
    id: "local-economic-empowerment",
    name: "Local Economic & Empowerment Alignment",
    shortName: "Local Economic & Empowerment",
    description:
      "Local employment, procurement, skills development, and targeted empowerment of women and youth, contributing to long-term economic resilience.",
    order: 6,
  },
  {
    id: "institutional-alignment",
    name: "Institutional Alignment",
    shortName: "Institutional Alignment",
    description:
      "Alignment with local and regional development plans, regulatory compliance, coordination with other actors, and support for local governance.",
    order: 7,
  },
  {
    id: "social-risk-readiness",
    name: "Social Risk Readiness",
    shortName: "Social Risk Readiness",
    description:
      "Social risk assessment, mitigation, monitoring, contingency planning, and rapid-response capacity for emerging social issues.",
    order: 8,
  },
];

export const DIMENSION_MAP: Record<string, Dimension> = DIMENSIONS.reduce(
  (map, dim) => {
    map[dim.id] = dim;
    return map;
  },
  {} as Record<string, Dimension>,
);

export function getDimension(id: string): Dimension | undefined {
  return DIMENSION_MAP[id];
}

export function getQuestionsForDimension(
  dimensionId: string,
  questions: import("./types").Question[],
): import("./types").Question[] {
  return questions
    .filter((q) => q.dimensionId === dimensionId)
    .sort((a, b) => a.order - b.order);
}
