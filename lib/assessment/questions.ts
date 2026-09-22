import type { AssessmentQuestion } from "@/types/assessment";

export const assessmentQuestions: AssessmentQuestion[] = [
  // ------------------------------------------------------------
  // 1. STAKEHOLDER COVERAGE
  // ------------------------------------------------------------
  {
    id: "sc-01",
    dimensionId: "stakeholder_coverage",
    text: "Has the project identified the main groups, institutions and individuals who may affect or be affected by the project?",
    helpText:
      "Consider affected communities, local organisations, businesses, government institutions, regulators and other relevant stakeholders.",
  },
  {
    id: "sc-02",
    dimensionId: "stakeholder_coverage",
    text: "Has the project identified stakeholders who may be particularly vulnerable to project impacts?",
    helpText:
      "Consider groups that may experience disproportionate social, economic or access-related impacts.",
  },
  {
    id: "sc-03",
    dimensionId: "stakeholder_coverage",
    text: "Are stakeholder interests, concerns and potential areas of influence documented?",
    helpText:
      "Look for a stakeholder register, stakeholder profiles, mapping or equivalent documentation.",
  },
  {
    id: "sc-04",
    dimensionId: "stakeholder_coverage",
    text: "Is the stakeholder mapping reviewed and updated when project circumstances change?",
    helpText:
      "Consider whether new stakeholders, changing relationships or emerging issues are captured.",
  },
  {
    id: "sc-05",
    dimensionId: "stakeholder_coverage",
    text: "Are responsibilities for managing key stakeholder relationships clearly assigned?",
    helpText:
      "Consider whether named project personnel or functions are accountable for priority relationships.",
  },

  // ------------------------------------------------------------
  // 2. COMMUNITY PARTICIPATION
  // ------------------------------------------------------------
  {
    id: "cp-01",
    dimensionId: "community_participation",
    text: "Are affected communities informed about the project's purpose, scope, timing and potential impacts?",
    helpText:
      "Consider whether information is provided early enough and in forms that affected communities can reasonably understand.",
  },
  {
    id: "cp-02",
    dimensionId: "community_participation",
    text: "Are affected communities given meaningful opportunities to express their views before important project decisions are made?",
    helpText:
      "Consider whether engagement occurs early enough to influence decisions rather than only communicating decisions that have already been made.",
  },
  {
    id: "cp-03",
    dimensionId: "community_participation",
    text: "Are participation methods appropriate to the characteristics and needs of the affected communities?",
    helpText:
      "Consider language, accessibility, meeting formats, timing, representation and local circumstances.",
  },
  {
    id: "cp-04",
    dimensionId: "community_participation",
    text: "Are community inputs documented and considered in project planning or decision-making?",
    helpText:
      "Look for records showing what communities raised and how the project responded.",
  },
  {
    id: "cp-05",
    dimensionId: "community_participation",
    text: "Are communities informed about how their significant concerns or recommendations were addressed?",
    helpText:
      "Consider whether the project closes the feedback loop after consultation or participation.",
  },

  // ------------------------------------------------------------
  // 3. ENGAGEMENT QUALITY
  // ------------------------------------------------------------
  {
    id: "eq-01",
    dimensionId: "engagement_quality",
    text: "Does the project have a documented stakeholder engagement approach or plan?",
    helpText:
      "Consider whether engagement objectives, stakeholders, methods, responsibilities and timing are defined.",
  },
  {
    id: "eq-02",
    dimensionId: "engagement_quality",
    text: "Is stakeholder engagement conducted throughout the project lifecycle rather than only at specific consultation points?",
    helpText:
      "Consider planning, construction, implementation, operation, change and close-out stages where applicable.",
  },
  {
    id: "eq-03",
    dimensionId: "engagement_quality",
    text: "Are stakeholder engagements consistently recorded and maintained as project records?",
    helpText:
      "Consider attendance, issues raised, commitments, actions, responsible persons and follow-up records.",
  },
  {
    id: "eq-04",
    dimensionId: "engagement_quality",
    text: "Are stakeholder commitments and agreed actions followed up within defined timeframes?",
    helpText:
      "Consider whether outstanding commitments are actively monitored rather than relying on informal follow-up.",
  },
  {
    id: "eq-05",
    dimensionId: "engagement_quality",
    text: "Does project management receive regular information about stakeholder engagement issues and emerging concerns?",
    helpText:
      "Consider whether stakeholder information reaches people who can make or influence project decisions.",
  },

  // ------------------------------------------------------------
  // 4. GRIEVANCE READINESS
  // ------------------------------------------------------------
  {
    id: "gr-01",
    dimensionId: "grievance_readiness",
    text: "Is there a clearly communicated process through which stakeholders can raise concerns or complaints?",
    helpText:
      "Consider whether stakeholders know where, how and with whom they can raise an issue.",
  },
  {
    id: "gr-02",
    dimensionId: "grievance_readiness",
    text: "Are grievance channels accessible to different groups affected by the project?",
    helpText:
      "Consider physical access, language, literacy, digital access, confidentiality and other practical barriers.",
  },
  {
    id: "gr-03",
    dimensionId: "grievance_readiness",
    text: "Are grievances recorded, categorised and tracked through to resolution or agreed closure?",
    helpText:
      "Consider whether the project can determine the status and history of each significant grievance.",
  },
  {
    id: "gr-04",
    dimensionId: "grievance_readiness",
    text: "Are responsibilities and response timeframes for handling grievances clearly defined?",
    helpText:
      "Consider escalation routes, responsible personnel and expected response or resolution timeframes.",
  },
  {
    id: "gr-05",
    dimensionId: "grievance_readiness",
    text: "Does the project analyse grievance patterns to identify recurring or emerging social risks?",
    helpText:
      "Consider whether grievance information is used for learning and preventive action rather than only case-by-case resolution.",
  },

  // ------------------------------------------------------------
  // 5. TRANSPARENCY & COMMITMENTS
  // ------------------------------------------------------------
  {
    id: "tc-01",
    dimensionId: "transparency_commitments",
    text: "Are significant commitments made to stakeholders documented in a consistent manner?",
    helpText:
      "Consider commitments arising from meetings, consultations, agreements, project communications or other engagement activities.",
  },
  {
    id: "tc-02",
    dimensionId: "transparency_commitments",
    text: "Does each significant stakeholder commitment have a responsible person or function assigned?",
    helpText:
      "Consider whether ownership is clear enough to support accountability.",
  },
  {
    id: "tc-03",
    dimensionId: "transparency_commitments",
    text: "Are stakeholder commitments monitored against agreed deadlines or milestones?",
    helpText:
      "Consider whether the project can identify overdue, completed and outstanding commitments.",
  },
  {
    id: "tc-04",
    dimensionId: "transparency_commitments",
    text: "Are material changes to commitments communicated to affected stakeholders?",
    helpText:
      "Consider whether stakeholders are informed when a commitment changes, is delayed or cannot be fulfilled.",
  },
  {
    id: "tc-05",
    dimensionId: "transparency_commitments",
    text: "Can project management demonstrate the status of significant stakeholder commitments?",
    helpText:
      "Consider whether reliable records or reporting are available when management needs to review commitments.",
  },

  // ------------------------------------------------------------
  // 6. LOCAL ECONOMIC & EMPOWERMENT ALIGNMENT
  // ------------------------------------------------------------
  {
    id: "ee-01",
    dimensionId: "economic_empowerment",
    text: "Has the project identified realistic opportunities for local economic participation?",
    helpText:
      "Consider local procurement, employment, enterprise participation, skills development and related opportunities.",
  },
  {
    id: "ee-02",
    dimensionId: "economic_empowerment",
    text: "Are local participation or empowerment objectives defined for the project?",
    helpText:
      "Consider whether objectives, targets, commitments or implementation requirements are clearly documented.",
  },
  {
    id: "ee-03",
    dimensionId: "economic_empowerment",
    text: "Are local participation and empowerment opportunities communicated transparently to relevant stakeholders?",
    helpText:
      "Consider whether potential beneficiaries and other stakeholders can understand available opportunities and requirements.",
  },
  {
    id: "ee-04",
    dimensionId: "economic_empowerment",
    text: "Are local economic and empowerment outcomes monitored against the project's objectives or commitments?",
    helpText:
      "Consider whether actual participation and outcomes are measured rather than only planned.",
  },
  {
    id: "ee-05",
    dimensionId: "economic_empowerment",
    text: "Are barriers preventing meaningful local participation identified and addressed where reasonably possible?",
    helpText:
      "Consider barriers such as capacity, information, procurement requirements, access, skills or timing.",
  },

  // ------------------------------------------------------------
  // 7. INSTITUTIONAL ALIGNMENT
  // ------------------------------------------------------------
  {
    id: "ia-01",
    dimensionId: "institutional_alignment",
    text: "Has the project identified the relevant government departments, municipalities, regulators and other institutions?",
    helpText:
      "Consider institutions with legal, regulatory, service delivery, infrastructure or community-related responsibilities.",
  },
  {
    id: "ia-02",
    dimensionId: "institutional_alignment",
    text: "Are institutional roles, responsibilities and dependencies relevant to the project documented?",
    helpText:
      "Consider whether the project understands which institutions are responsible for key decisions, approvals or services.",
  },
  {
    id: "ia-03",
    dimensionId: "institutional_alignment",
    text: "Are relevant institutions engaged at appropriate stages of the project?",
    helpText:
      "Consider whether engagement occurs early enough to support coordination and reduce avoidable institutional conflict.",
  },
  {
    id: "ia-04",
    dimensionId: "institutional_alignment",
    text: "Are institutional commitments, dependencies and outstanding actions monitored?",
    helpText:
      "Consider whether the project tracks matters that depend on external institutions.",
  },
  {
    id: "ia-05",
    dimensionId: "institutional_alignment",
    text: "Are institutional changes or emerging policy, regulatory or administrative issues reflected in project stakeholder planning?",
    helpText:
      "Consider whether the project updates its approach when the institutional environment changes.",
  },

  // ------------------------------------------------------------
  // 8. SOCIAL RISK READINESS
  // ------------------------------------------------------------
  {
    id: "sr-01",
    dimensionId: "social_risk_readiness",
    text: "Does the project maintain a documented view of its significant stakeholder and community risks?",
    helpText:
      "Consider whether social risks are identified, described and assigned rather than remaining informal concerns.",
  },
  {
    id: "sr-02",
    dimensionId: "social_risk_readiness",
    text: "Are indicators or warning signs used to identify emerging stakeholder or community risks?",
    helpText:
      "Consider signals such as recurring complaints, participation changes, unresolved commitments, misinformation or community tensions.",
  },
  {
    id: "sr-03",
    dimensionId: "social_risk_readiness",
    text: "Are significant social risks assigned to responsible persons for monitoring or response?",
    helpText:
      "Consider whether ownership and escalation responsibilities are clear.",
  },
  {
    id: "sr-04",
    dimensionId: "social_risk_readiness",
    text: "Does the project have defined responses or escalation arrangements for significant social risks?",
    helpText:
      "Consider whether the project knows what action should be taken when a material social risk emerges.",
  },
  {
    id: "sr-05",
    dimensionId: "social_risk_readiness",
    text: "Are lessons from stakeholder issues, grievances and social risks incorporated into ongoing project planning?",
    helpText:
      "Consider whether the project uses experience and emerging information to adjust its approach.",
  },
];