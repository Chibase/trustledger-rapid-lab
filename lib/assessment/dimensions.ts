import type { AssessmentDimension } from "@/types/assessment";

export const assessmentDimensions: AssessmentDimension[] = [
  {
    id: "stakeholder_coverage",
    name: "Stakeholder Coverage",
    description:
      "The extent to which the project understands the people, groups, institutions and interests that may affect or be affected by the project.",
    questionIds: ["sc-01", "sc-02", "sc-03", "sc-04", "sc-05"],
  },
  {
    id: "community_participation",
    name: "Community Participation",
    description:
      "The extent to which affected communities are meaningfully informed, consulted and involved in matters that affect them.",
    questionIds: ["cp-01", "cp-02", "cp-03", "cp-04", "cp-05"],
  },
  {
    id: "engagement_quality",
    name: "Engagement Quality",
    description:
      "The extent to which stakeholder engagement is structured, continuous, documented and followed through.",
    questionIds: ["eq-01", "eq-02", "eq-03", "eq-04", "eq-05"],
  },
  {
    id: "grievance_readiness",
    name: "Grievance Readiness",
    description:
      "The extent to which stakeholders can raise concerns and receive predictable, accountable responses.",
    questionIds: ["gr-01", "gr-02", "gr-03", "gr-04", "gr-05"],
  },
  {
    id: "transparency_commitments",
    name: "Transparency & Commitments",
    description:
      "The extent to which stakeholder commitments are documented, assigned, monitored and communicated.",
    questionIds: ["tc-01", "tc-02", "tc-03", "tc-04", "tc-05"],
  },
  {
    id: "economic_empowerment",
    name: "Local Economic & Empowerment Alignment",
    description:
      "The extent to which the project identifies, implements and monitors local economic participation and empowerment opportunities.",
    questionIds: ["ee-01", "ee-02", "ee-03", "ee-04", "ee-05"],
  },
  {
    id: "institutional_alignment",
    name: "Institutional Alignment",
    description:
      "The extent to which relevant government, regulatory and institutional stakeholders are identified and appropriately engaged.",
    questionIds: ["ia-01", "ia-02", "ia-03", "ia-04", "ia-05"],
  },
  {
    id: "social_risk_readiness",
    name: "Social Risk Readiness",
    description:
      "The extent to which the project identifies, monitors and responds to emerging stakeholder and community risks.",
    questionIds: ["sr-01", "sr-02", "sr-03", "sr-04", "sr-05"],
  },
];