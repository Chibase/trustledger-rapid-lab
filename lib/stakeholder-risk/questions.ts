import type { RiskQuestion, RiskLens } from "@/types/stakeholder-risk";

export const riskQuestions: RiskQuestion[] = [
  // ------------------------------------------------------------
  // 1. STAKEHOLDER COVERAGE
  // ------------------------------------------------------------
  {
    id: "sc-01",
    conditionId: "stakeholder_coverage",
    text: "Have all relevant stakeholder groups been identified and mapped for the project?",
    helpText: "Consider affected communities, businesses, institutions, government bodies, and other interested parties.",
    riskLenses: ["financial", "operational", "regulatory", "social"],
  },
  {
    id: "sc-02",
    conditionId: "stakeholder_coverage",
    text: "Are stakeholder interests, concerns, and potential impacts understood and documented?",
    helpText: "Consider economic, social, environmental, and other interests that stakeholders may have in the project.",
    riskLenses: ["financial", "social", "environmental", "reputational"],
  },
  {
    id: "sc-03",
    conditionId: "stakeholder_coverage",
    text: "Is there a maintained stakeholder register that is updated as project circumstances change?",
    helpText: "Consider whether new stakeholders emerge or stakeholder relationships evolve during the project lifecycle.",
    riskLenses: ["operational", "political", "market"],
  },
  {
    id: "sc-04",
    conditionId: "stakeholder_coverage",
    text: "Are responsibilities for managing key stakeholder relationships clearly assigned?",
    helpText: "Consider whether named personnel or functions are accountable for priority stakeholder relationships.",
    riskLenses: ["operational", "institutional"],
  },
  {
    id: "sc-05",
    conditionId: "stakeholder_coverage",
    text: "Are stakeholder mapping and identification processes systematic and repeatable?",
    helpText: "Consider whether there are established processes for ongoing stakeholder identification and analysis.",
    riskLenses: ["operational", "regulatory"],
  },

  // ------------------------------------------------------------
  // 2. INFLUENCE & POWER
  // ------------------------------------------------------------
  {
    id: "ip-01",
    conditionId: "influence_power",
    text: "Have the relative influence and power of different stakeholder groups been assessed?",
    helpText: "Consider formal authority, economic power, social influence, and political connections.",
    riskLenses: ["political", "regulatory", "financial"],
  },
  {
    id: "ip-02",
    conditionId: "influence_power",
    text: "Are there understood power dynamics between stakeholder groups that could affect project outcomes?",
    helpText: "Consider competing interests, alliances between stakeholders, and potential for coalition building.",
    riskLenses: ["political", "social", "reputational"],
  },
  {
    id: "ip-03",
    conditionId: "influence_power",
    text: "Does the project have strategies for engaging with high-influence stakeholders?",
    helpText: "Consider tailored engagement approaches for influential stakeholders and decision-makers.",
    riskLenses: ["political", "operational", "financial"],
  },
  {
    id: "ip-04",
    conditionId: "influence_power",
    text: "Are potential shifts in stakeholder influence or power monitored and anticipated?",
    helpText: "Consider how stakeholder power might change during project implementation or due to external factors.",
    riskLenses: ["political", "market", "change"],
  },
  {
    id: "ip-05",
    conditionId: "influence_power",
    text: "Is there a balance of power between the project and key stakeholders?",
    helpText: "Consider whether the project has sufficient leverage to manage stakeholder relationships effectively.",
    riskLenses: ["financial", "operational", "political"],
  },

  // ------------------------------------------------------------
  // 3. EXPECTATIONS & PERCEPTIONS
  // ------------------------------------------------------------
  {
    id: "ep-01",
    conditionId: "expectations_perceptions",
    text: "Have stakeholder expectations of the project been identified and documented?",
    helpText: "Consider expectations around benefits, impacts, timeline, quality, and project behavior.",
    riskLenses: ["financial", "social", "reputational"],
  },
  {
    id: "ep-02",
    conditionId: "expectations_perceptions",
    text: "Are stakeholder perceptions of the project value and benefits understood?",
    helpText: "Consider how different stakeholders perceive the project's purpose, benefits, and overall value.",
    riskLenses: ["social", "reputational", "market"],
  },
  {
    id: "ep-03",
    conditionId: "expectations_perceptions",
    text: "Are there gaps between stakeholder expectations and what the project can realistically deliver?",
    helpText: "Consider whether expectations are aligned with project capabilities, timeline, and resources.",
    riskLenses: ["financial", "operational", "reputational"],
  },
  {
    id: "ep-04",
    conditionId: "expectations_perceptions",
    text: "Does the project communicate clearly to manage stakeholder expectations?",
    helpText: "Consider the clarity, accuracy, and timeliness of project communications.",
    riskLenses: ["reputational", "social", "operational"],
  },
  {
    id: "ep-05",
    conditionId: "expectations_perceptions",
    text: "Are changes to project scope, timeline, or benefits communicated to affected stakeholders?",
    helpText: "Consider how changes are communicated and whether stakeholders understand the implications.",
    riskLenses: ["financial", "reputational", "operational"],
  },

  // ------------------------------------------------------------
  // 4. ENGAGEMENT & RELATIONSHIPS
  // ------------------------------------------------------------
  {
    id: "er-01",
    conditionId: "engagement_relationships",
    text: "Is there a structured approach to stakeholder engagement throughout the project lifecycle?",
    helpText: "Consider whether engagement is planned, systematic, and sustained rather than ad-hoc.",
    riskLenses: ["operational", "social", "institutional"],
  },
  {
    id: "er-02",
    conditionId: "engagement_relationships",
    text: "Are stakeholder engagements documented and tracked for follow-up?",
    helpText: "Consider whether engagement records, commitments, and action items are maintained.",
    riskLenses: ["operational", "regulatory", "financial"],
  },
  {
    id: "er-03",
    conditionId: "engagement_relationships",
    text: "Do key stakeholders report positive relationships with the project team?",
    helpText: "Consider the quality of relationships and whether stakeholders feel heard and respected.",
    riskLenses: ["social", "reputational", "political"],
  },
  {
    id: "er-04",
    conditionId: "engagement_relationships",
    text: "Are engagement methods appropriate to the characteristics and needs of different stakeholder groups?",
    helpText: "Consider language, accessibility, format, timing, and cultural appropriateness.",
    riskLenses: ["social", "operational", "environmental"],
  },
  {
    id: "er-05",
    conditionId: "engagement_relationships",
    text: "Does project management receive regular information about stakeholder engagement issues?",
    helpText: "Consider whether stakeholder information reaches decision-makers who can act on it.",
    riskLenses: ["operational", "financial", "political"],
  },

  // ------------------------------------------------------------
  // 5. GRIEVANCE & CONFLICT
  // ------------------------------------------------------------
  {
    id: "gc-01",
    conditionId: "grievance_conflict",
    text: "Is there a clear process for stakeholders to raise concerns or grievances?",
    helpText: "Consider whether stakeholders know how, where, and to whom they can raise issues.",
    riskLenses: ["social", "operational", "regulatory"],
  },
  {
    id: "gc-02",
    conditionId: "grievance_conflict",
    text: "Are grievance channels accessible to different stakeholder groups?",
    helpText: "Consider physical access, language, literacy, digital access, and confidentiality.",
    riskLenses: ["social", "environmental", "operational"],
  },
  {
    id: "gc-03",
    conditionId: "grievance_conflict",
    text: "Are grievances tracked through to resolution or agreed closure?",
    helpText: "Consider whether the project can determine the status and history of significant grievances.",
    riskLenses: ["operational", "regulatory", "reputational"],
  },
  {
    id: "gc-04",
    conditionId: "grievance_conflict",
    text: "Are there recurring themes or patterns in stakeholder grievances?",
    helpText: "Consider whether grievance analysis reveals systemic issues that need addressing.",
    riskLenses: ["social", "operational", "financial"],
  },
  {
    id: "gc-05",
    conditionId: "grievance_conflict",
    text: "Does the project have strategies for preventing and managing stakeholder conflicts?",
    helpText: "Consider conflict prevention, early intervention, and resolution mechanisms.",
    riskLenses: ["social", "political", "reputational"],
  },

  // ------------------------------------------------------------
  // 6. BENEFITS / EMPLOYMENT / EMPOWERMENT
  // ------------------------------------------------------------
  {
    id: "be-01",
    conditionId: "benefits_empowerment",
    text: "Have local economic participation and employment opportunities been identified?",
    helpText: "Consider local procurement, employment, enterprise development, and skills transfer.",
    riskLenses: ["financial", "social", "market"],
  },
  {
    id: "be-02",
    conditionId: "benefits_empowerment",
    text: "Are local participation objectives defined and communicated to relevant stakeholders?",
    helpText: "Consider whether targets, commitments, and opportunities are clearly documented and shared.",
    riskLenses: ["financial", "social", "reputational"],
  },
  {
    id: "be-03",
    conditionId: "benefits_empowerment",
    text: "Are local economic outcomes monitored against project objectives?",
    helpText: "Consider whether actual participation and outcomes are measured and reported.",
    riskLenses: ["financial", "operational", "regulatory"],
  },
  {
    id: "be-04",
    conditionId: "benefits_empowerment",
    text: "Are barriers to meaningful local participation identified and addressed?",
    helpText: "Consider capacity, information, procurement requirements, access, skills, and timing barriers.",
    riskLenses: ["social", "operational", "financial"],
  },
  {
    id: "be-05",
    conditionId: "benefits_empowerment",
    text: "Do stakeholders perceive the distribution of benefits as fair and equitable?",
    helpText: "Consider whether benefit sharing is perceived as fair across different stakeholder groups.",
    riskLenses: ["social", "reputational", "political"],
  },

  // ------------------------------------------------------------
  // 7. INSTITUTIONAL & GOVERNANCE
  // ------------------------------------------------------------
  {
    id: "ig-01",
    conditionId: "institutional_governance",
    text: "Have relevant government, regulatory, and institutional stakeholders been identified?",
    helpText: "Consider institutions with legal, regulatory, service delivery, and community responsibilities.",
    riskLenses: ["regulatory", "political", "institutional"],
  },
  {
    id: "ig-02",
    conditionId: "institutional_governance",
    text: "Are institutional roles, responsibilities, and dependencies understood?",
    helpText: "Consider which institutions are responsible for key decisions, approvals, and services.",
    riskLenses: ["regulatory", "operational", "political"],
  },
  {
    id: "ig-03",
    conditionId: "institutional_governance",
    text: "Are relevant institutions engaged at appropriate stages of the project?",
    helpText: "Consider whether engagement occurs early enough to support coordination and reduce conflict.",
    riskLenses: ["regulatory", "political", "operational"],
  },
  {
    id: "ig-04",
    conditionId: "institutional_governance",
    text: "Are institutional commitments and dependencies monitored and tracked?",
    helpText: "Consider whether the project tracks matters that depend on external institutions.",
    riskLenses: ["operational", "regulatory", "financial"],
  },
  {
    id: "ig-05",
    conditionId: "institutional_governance",
    text: "Does the project adapt to institutional changes or emerging policy issues?",
    helpText: "Consider whether the project updates its approach when the institutional environment changes.",
    riskLenses: ["political", "regulatory", "change", "institutional"],
  },

  // ------------------------------------------------------------
  // 8. CHANGE / DISRUPTION / EXTERNAL
  // ------------------------------------------------------------
  {
    id: "cd-01",
    conditionId: "change_disruption",
    text: "Has the project assessed potential external disruptions that could affect stakeholder relationships?",
    helpText: "Consider economic changes, political shifts, social trends, and environmental events.",
    riskLenses: ["political", "market", "environmental", "change", "operational"],
  },
  {
    id: "cd-02",
    conditionId: "change_disruption",
    text: "Are there contingency plans for managing significant external changes?",
    helpText: "Consider how the project would respond to major external disruptions or changes.",
    riskLenses: ["operational", "financial", "political"],
  },
  {
    id: "cd-03",
    conditionId: "change_disruption",
    text: "Does the project monitor external factors that could affect stakeholder dynamics?",
    helpText: "Consider environmental scanning, trend monitoring, and early warning systems.",
    riskLenses: ["political", "market", "social", "change"],
  },
  {
    id: "cd-04",
    conditionId: "change_disruption",
    text: "Are stakeholders prepared for project-related changes and transitions?",
    helpText: "Consider how stakeholders are prepared for different phases of the project lifecycle.",
    riskLenses: ["social", "operational", "change"],
  },
  {
    id: "cd-05",
    conditionId: "change_disruption",
    text: "Does the project have flexibility to adapt to changing stakeholder dynamics?",
    helpText: "Consider whether the project can adjust its approach as stakeholder conditions change.",
    riskLenses: ["operational", "financial", "political", "change"],
  },
];
