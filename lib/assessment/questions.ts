import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  // --- Stakeholder Coverage ---
  {
    id: "sc-1",
    dimensionId: "stakeholder-coverage",
    order: 1,
    text: "Has a comprehensive stakeholder mapping exercise been conducted for the project?",
    guidance:
      "Consider whether stakeholder mapping covers all project phases and geographic areas of influence.",
  },
  {
    id: "sc-2",
    dimensionId: "stakeholder-coverage",
    order: 2,
    text: "Are directly affected communities identified and documented?",
    guidance:
      "Directly affected parties include those experiencing land acquisition, resettlement, noise, dust, or other direct project impacts.",
  },
  {
    id: "sc-3",
    dimensionId: "stakeholder-coverage",
    order: 3,
    text: "Are indirectly affected stakeholders (e.g., downstream water users, neighbouring communities) identified?",
    guidance:
      "Indirect stakeholders may include downstream users of shared resources, service providers, and regional authorities.",
  },
  {
    id: "sc-4",
    dimensionId: "stakeholder-coverage",
    order: 4,
    text: "Are vulnerable or marginalised groups specifically identified in the stakeholder map?",
    guidance:
      "Vulnerable groups may include women, youth, elderly, persons with disabilities, indigenous peoples, and low-income households.",
  },
  {
    id: "sc-5",
    dimensionId: "stakeholder-coverage",
    order: 5,
    text: "Is the stakeholder list regularly reviewed and updated?",
    guidance:
      "Consider whether the stakeholder map is treated as a living document with scheduled review cycles.",
  },

  // --- Community Participation ---
  {
    id: "cp-1",
    dimensionId: "community-participation",
    order: 1,
    text: "Were affected communities consulted before key project decisions were made?",
    guidance:
      "Early consultation before final design decisions is a stronger indicator than post-decision consultation.",
  },
  {
    id: "cp-2",
    dimensionId: "community-participation",
    order: 2,
    text: "Are participatory methods used to gather community input?",
    guidance:
      "Participatory methods include focus groups, community mapping, participatory rural appraisal, and structured workshops.",
  },
  {
    id: "cp-3",
    dimensionId: "community-participation",
    order: 3,
    text: "Is there a documented process for incorporating community feedback into project design?",
    guidance:
      "Consider whether feedback is systematically logged and traceable to design changes or responses.",
  },
  {
    id: "cp-4",
    dimensionId: "community-participation",
    order: 4,
    text: "Do community representatives have a voice in ongoing project governance?",
    guidance:
      "This could include community advisory boards, joint oversight committees, or regular community forums.",
  },
  {
    id: "cp-5",
    dimensionId: "community-participation",
    order: 5,
    text: "Are participation opportunities accessible to all community segments, including vulnerable groups?",
    guidance:
      "Accessibility includes timing, location, language, childcare, and transport support where needed.",
  },

  // --- Engagement Quality ---
  {
    id: "eq-1",
    dimensionId: "engagement-quality",
    order: 1,
    text: "Is engagement conducted in languages and formats appropriate to the community?",
    guidance:
      "Consider local language use, visual materials for low-literacy contexts, and culturally appropriate communication styles.",
  },
  {
    id: "eq-2",
    dimensionId: "engagement-quality",
    order: 2,
    text: "Are engagement meetings documented with attendance and minutes?",
    guidance:
      "Documentation should include date, location, attendees, topics discussed, and decisions or commitments made.",
  },
  {
    id: "eq-3",
    dimensionId: "engagement-quality",
    order: 3,
    text: "Is sufficient notice given before engagement events?",
    guidance:
      "Best practice is at least 7–14 days notice through multiple channels accessible to the community.",
  },
  {
    id: "eq-4",
    dimensionId: "engagement-quality",
    order: 4,
    text: "Are engagement venues accessible and safe for all stakeholders?",
    guidance:
      "Consider physical accessibility, safety, neutrality of venue, and freedom from intimidation.",
  },
  {
    id: "eq-5",
    dimensionId: "engagement-quality",
    order: 5,
    text: "Does the project team include staff with cultural competency for the local context?",
    guidance:
      "Cultural competency includes local language skills, understanding of customs, and community relationships.",
  },

  // --- Grievance Readiness ---
  {
    id: "gr-1",
    dimensionId: "grievance-readiness",
    order: 1,
    text: "Is a formal grievance mechanism established and operational?",
    guidance:
      "A formal mechanism has defined procedures, responsible staff, and is actively receiving and processing grievances.",
  },
  {
    id: "gr-2",
    dimensionId: "grievance-readiness",
    order: 2,
    text: "Are grievance channels accessible to all affected stakeholders (multiple channels)?",
    guidance:
      "Multiple channels may include in-person, phone, SMS, written, and community liaison staff.",
  },
  {
    id: "gr-3",
    dimensionId: "grievance-readiness",
    order: 3,
    text: "Are grievances acknowledged and responded to within defined timeframes?",
    guidance:
      "Consider whether SLAs exist for acknowledgement (e.g., 48 hours) and resolution (e.g., 30 days).",
  },
  {
    id: "gr-4",
    dimensionId: "grievance-readiness",
    order: 4,
    text: "Is grievance data tracked and analysed for trends?",
    guidance:
      "Trend analysis helps identify systemic issues, recurring grievances, and geographic or demographic patterns.",
  },
  {
    id: "gr-5",
    dimensionId: "grievance-readiness",
    order: 5,
    text: "Are grievance outcomes communicated back to the complainant and community?",
    guidance:
      "Feedback loops close the cycle and build trust that grievances are taken seriously.",
  },

  // --- Transparency & Commitments ---
  {
    id: "tc-1",
    dimensionId: "transparency-commitments",
    order: 1,
    text: "Are project plans, impacts, and benefits publicly disclosed?",
    guidance:
      "Public disclosure may include project websites, community notice boards, public meetings, and local libraries.",
  },
  {
    id: "tc-2",
    dimensionId: "transparency-commitments",
    order: 2,
    text: "Is a commitments register maintained and tracked?",
    guidance:
      "A commitments register logs promises made to stakeholders, with status tracking and responsible parties.",
  },
  {
    id: "tc-3",
    dimensionId: "transparency-commitments",
    order: 3,
    text: "Are environmental and social impact assessments publicly available?",
    guidance:
      "Consider whether assessments are accessible in local languages and formats understandable to non-technical audiences.",
  },
  {
    id: "tc-4",
    dimensionId: "transparency-commitments",
    order: 4,
    text: "Are project progress reports shared with stakeholders regularly?",
    guidance:
      "Regular reporting (quarterly or semi-annually) demonstrates ongoing accountability beyond initial disclosure.",
  },
  {
    id: "tc-5",
    dimensionId: "transparency-commitments",
    order: 5,
    text: "Are project funding sources and financial arrangements disclosed?",
    guidance:
      "Transparency about funding sources, lenders, and financial arrangements builds accountability and trust.",
  },

  // --- Local Economic & Empowerment Alignment ---
  {
    id: "le-1",
    dimensionId: "local-economic-empowerment",
    order: 1,
    text: "Are local employment targets defined and monitored?",
    guidance:
      "Consider whether targets are quantified, disaggregated by demographic group, and tracked against actuals.",
  },
  {
    id: "le-2",
    dimensionId: "local-economic-empowerment",
    order: 2,
    text: "Are local procurement and supplier development programmes in place?",
    guidance:
      "Supplier development may include capacity building, preferential procurement, and access to finance for local businesses.",
  },
  {
    id: "le-3",
    dimensionId: "local-economic-empowerment",
    order: 3,
    text: "Are skills development and training programmes provided for community members?",
    guidance:
      "Training should be aligned to project-relevant skills and also to post-construction livelihood opportunities.",
  },
  {
    id: "le-4",
    dimensionId: "local-economic-empowerment",
    order: 4,
    text: "Are specific initiatives in place to empower women and youth?",
    guidance:
      "Consider targeted employment, procurement, training, and decision-making participation for women and youth.",
  },
  {
    id: "le-5",
    dimensionId: "local-economic-empowerment",
    order: 5,
    text: "Does the project contribute to long-term local economic diversification beyond construction?",
    guidance:
      "Consider legacy infrastructure, post-construction livelihoods, SME development, and asset transfer.",
  },

  // --- Institutional Alignment ---
  {
    id: "ia-1",
    dimensionId: "institutional-alignment",
    order: 1,
    text: "Does the project align with local and regional development plans?",
    guidance:
      "Alignment means the project contributes to, rather than conflicts with, IDPs, regional plans, and sector strategies.",
  },
  {
    id: "ia-2",
    dimensionId: "institutional-alignment",
    order: 2,
    text: "Are memoranda of understanding or agreements with local authorities in place?",
    guidance:
      "Formal agreements demonstrate mutual understanding and shared accountability with local government.",
  },
  {
    id: "ia-3",
    dimensionId: "institutional-alignment",
    order: 3,
    text: "Are regulatory permits and approvals current and compliant?",
    guidance:
      "Consider environmental authorisations, water use licences, land use rights, and construction permits.",
  },
  {
    id: "ia-4",
    dimensionId: "institutional-alignment",
    order: 4,
    text: "Is there coordination with other development actors in the area (NGOs, government programmes)?",
    guidance:
      "Coordination avoids duplication, identifies synergies, and strengthens the local development ecosystem.",
  },
  {
    id: "ia-5",
    dimensionId: "institutional-alignment",
    order: 5,
    text: "Does the project support rather than undermine local governance structures?",
    guidance:
      "Consider whether the project strengthens traditional authorities and municipal capacity, or bypasses them.",
  },

  // --- Social Risk Readiness ---
  {
    id: "sr-1",
    dimensionId: "social-risk-readiness",
    order: 1,
    text: "Has a social risk assessment been conducted?",
    guidance:
      "A social risk assessment identifies, rates, and prioritises social risks across project phases.",
  },
  {
    id: "sr-2",
    dimensionId: "social-risk-readiness",
    order: 2,
    text: "Are social risk mitigation measures defined and resourced?",
    guidance:
      "Mitigation measures should have assigned owners, budgets, and timelines — not just descriptions.",
  },
  {
    id: "sr-3",
    dimensionId: "social-risk-readiness",
    order: 3,
    text: "Is there a monitoring system for social risk indicators?",
    guidance:
      "Monitoring should include leading indicators (e.g., grievance trends, community sentiment) not just lagging indicators.",
  },
  {
    id: "sr-4",
    dimensionId: "social-risk-readiness",
    order: 4,
    text: "Are contingency plans in place for social unrest or conflict scenarios?",
    guidance:
      "Contingency plans should be scenario-based, with escalation triggers and defined response protocols.",
  },
  {
    id: "sr-5",
    dimensionId: "social-risk-readiness",
    order: 5,
    text: "Is there capacity to escalate and respond rapidly to emerging social issues?",
    guidance:
      "Rapid response requires decision-making authority, communication channels, and dedicated personnel.",
  },
];

export const QUESTION_MAP: Record<string, Question> = QUESTIONS.reduce(
  (map, q) => {
    map[q.id] = q;
    return map;
  },
  {} as Record<string, Question>,
);

export function getQuestion(id: string): Question | undefined {
  return QUESTION_MAP[id];
}
