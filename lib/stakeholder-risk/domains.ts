import type { StakeholderCondition } from "@/types/stakeholder-risk";

export const stakeholderConditions: StakeholderCondition[] = [
  {
    id: "stakeholder_coverage",
    name: "Stakeholder Coverage",
    description:
      "The extent to which relevant stakeholders are identified, understood, and their interests mapped for the project.",
    questionIds: ["sc-01", "sc-02", "sc-03", "sc-04", "sc-05"],
  },
  {
    id: "influence_power",
    name: "Influence & Power",
    description:
      "The distribution of influence and power among stakeholder groups and how this affects project dynamics and decision-making.",
    questionIds: ["ip-01", "ip-02", "ip-03", "ip-04", "ip-05"],
  },
  {
    id: "expectations_perceptions",
    name: "Expectations & Perceptions",
    description:
      "Stakeholder expectations of the project and their perceptions of its benefits, impacts, and value proposition.",
    questionIds: ["ep-01", "ep-02", "ep-03", "ep-04", "ep-05"],
  },
  {
    id: "engagement_relationships",
    name: "Engagement & Relationships",
    description:
      "The quality of stakeholder engagement processes and the strength of relationships built with key stakeholder groups.",
    questionIds: ["er-01", "er-02", "er-03", "er-04", "er-05"],
  },
  {
    id: "grievance_conflict",
    name: "Grievance & Conflict",
    description:
      "The existence, management, and resolution of stakeholder grievances, conflicts, and points of contention.",
    questionIds: ["gc-01", "gc-02", "gc-03", "gc-04", "gc-05"],
  },
  {
    id: "benefits_empowerment",
    name: "Benefits / Employment / Empowerment",
    description:
      "The distribution of project benefits, employment opportunities, and empowerment initiatives among affected stakeholders.",
    questionIds: ["be-01", "be-02", "be-03", "be-04", "be-05"],
  },
  {
    id: "institutional_governance",
    name: "Institutional & Governance",
    description:
      "The alignment with institutional structures, governance frameworks, and regulatory environments affecting the project.",
    questionIds: ["ig-01", "ig-02", "ig-03", "ig-04", "ig-05"],
  },
  {
    id: "change_disruption",
    name: "Change / Disruption / External",
    description:
      "The management of change processes, potential disruptions, and external factors that could affect stakeholder dynamics.",
    questionIds: ["cd-01", "cd-02", "cd-03", "cd-04", "cd-05"],
  },
];
