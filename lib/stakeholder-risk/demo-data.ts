import type { RiskResponse, RiskProject } from "@/types/stakeholder-risk";

export const demoRiskProject: RiskProject = {
  name: "Metropolitan Transport Infrastructure Project",
  type: "Transport Infrastructure",
  location: "Gauteng Province",
  stage: "Construction",
  sponsor: "Department of Transport",
  assessmentDate: new Date().toISOString().slice(0, 10),
  approximateValue: "R2.8 billion",
  affectedCommunity: "Johannesburg, Pretoria, and surrounding municipalities",
  respondentRole: "Project Risk Manager",
};

export const demoRiskResponses: RiskResponse[] = [
  // Stakeholder Coverage - Developing conditions
  { questionId: "sc-01", value: 2 },
  { questionId: "sc-02", value: 2 },
  { questionId: "sc-03", value: 1 },
  { questionId: "sc-04", value: 2 },
  { questionId: "sc-05", value: 2 },

  // Influence & Power - Poor conditions
  { questionId: "ip-01", value: 1 },
  { questionId: "ip-02", value: 2 },
  { questionId: "ip-03", value: 1 },
  { questionId: "ip-04", value: 1 },
  { questionId: "ip-05", value: 2 },

  // Expectations & Perceptions - Poor conditions
  { questionId: "ep-01", value: 1 },
  { questionId: "ep-02", value: 2 },
  { questionId: "ep-03", value: 1 },
  { questionId: "ep-04", value: 2 },
  { questionId: "ep-05", value: 1 },

  // Engagement & Relationships - Developing conditions
  { questionId: "er-01", value: 2 },
  { questionId: "er-02", value: 2 },
  { questionId: "er-03", value: 2 },
  { questionId: "er-04", value: 2 },
  { questionId: "er-05", value: 2 },

  // Grievance & Conflict - Critical conditions
  { questionId: "gc-01", value: 0 },
  { questionId: "gc-02", value: 1 },
  { questionId: "gc-03", value: 1 },
  { questionId: "gc-04", value: 0 },
  { questionId: "gc-05", value: 1 },

  // Benefits / Employment / Empowerment - Poor conditions
  { questionId: "be-01", value: 1 },
  { questionId: "be-02", value: 2 },
  { questionId: "be-03", value: 1 },
  { questionId: "be-04", value: 1 },
  { questionId: "be-05", value: 2 },

  // Institutional & Governance - Developing conditions
  { questionId: "ig-01", value: 2 },
  { questionId: "ig-02", value: 2 },
  { questionId: "ig-03", value: 2 },
  { questionId: "ig-04", value: 1 },
  { questionId: "ig-05", value: 2 },

  // Change / Disruption / External - Poor conditions
  { questionId: "cd-01", value: 1 },
  { questionId: "cd-02", value: 1 },
  { questionId: "cd-03", value: 1 },
  { questionId: "cd-04", value: 2 },
  { questionId: "cd-05", value: 1 },
];
