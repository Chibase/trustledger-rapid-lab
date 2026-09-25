import type {
  Stakeholder,
  StakeholderSignal,
  SentimentObservation,
  BehaviourObservation,
  StakeholderEvent,
  ProjectOutcome,
  ConsequenceObservation,
  Prediction,
  PredictionOutcome,
} from "@/types/stakeholder-risk";

// ------------------------------------------------------------
// SCENARIO A: STABLE STAKEHOLDER ENVIRONMENT
// ------------------------------------------------------------

export const scenarioA = {
  name: "Stable Stakeholder Environment",
  description: "Demonstrates a stable stakeholder environment with positive conditions and low risk indicators.",
  
  stakeholders: [
    {
      id: "stakeholder-001",
      name: "Local Community Association",
      type: "community",
      project: "Demo Project A",
      geographicContext: "Northern District",
      influencePower: 65,
      status: "supportive",
    },
    {
      id: "stakeholder-002",
      name: "Regional Business Council",
      type: "business",
      project: "Demo Project A",
      geographicContext: "Central District",
      influencePower: 75,
      status: "supportive",
    },
  ] as Stakeholder[],
  
  signals: [
    {
      id: "signal-001",
      stakeholderId: "stakeholder-001",
      project: "Demo Project A",
      signalType: "meeting_attendance",
      value: 85,
      direction: "stable",
      severity: "low",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Meeting records",
      classification: "Observed",
    },
    {
      id: "signal-002",
      stakeholderId: "stakeholder-001",
      project: "Demo Project A",
      signalType: "commitment_completion",
      value: 90,
      direction: "stable",
      severity: "low",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Commitment tracking",
      classification: "Calculated",
    },
  ] as StakeholderSignal[],
  
  sentiment: [
    {
      id: "sentiment-001",
      stakeholderId: "stakeholder-001",
      project: "Demo Project A",
      geography: "Northern District",
      date: "2026-09-24",
      trust: 75,
      satisfaction: 80,
      perceivedFairness: 85,
      confidenceInCommitments: 78,
      willingnessToCooperate: 82,
      overallSentiment: 80,
      sentimentTrend: "stable",
      evidenceSource: "Community survey",
      sampleInformation: "45 respondents",
      classification: "Observed",
    },
  ] as SentimentObservation[],
  
  behaviour: [
    {
      id: "behaviour-001",
      stakeholderId: "stakeholder-001",
      project: "Demo Project A",
      behaviourType: "meeting_attendance",
      category: "constructive",
      dateTime: "2026-09-24T14:00:00Z",
      location: "Community Hall",
      direction: "stable",
      severity: "low",
      evidence: "Regular participation in monthly meetings",
      outcome: "Productive discussion",
      classification: "Observed",
    },
  ] as BehaviourObservation[],
  
  events: [] as StakeholderEvent[],
  
  outcomes: [] as ProjectOutcome[],
  
  consequences: [] as ConsequenceObservation[],
};

// ------------------------------------------------------------
// SCENARIO B: DETERIORATING SENTIMENT
// ------------------------------------------------------------

export const scenarioB = {
  name: "Deteriorating Sentiment",
  description: "Demonstrates declining stakeholder sentiment with emerging warning signals.",
  
  stakeholders: [
    {
      id: "stakeholder-003",
      name: "Residents Association",
      type: "community",
      project: "Demo Project B",
      geographicContext: "Eastern District",
      influencePower: 55,
      status: "neutral",
    },
  ] as Stakeholder[],
  
  signals: [
    {
      id: "signal-003",
      stakeholderId: "stakeholder-003",
      project: "Demo Project B",
      signalType: "participation_rate",
      value: 45,
      direction: "decreasing",
      severity: "moderate",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Meeting attendance records",
      classification: "Observed",
    },
    {
      id: "signal-004",
      stakeholderId: "stakeholder-003",
      project: "Demo Project B",
      signalType: "response_rate",
      value: 50,
      direction: "decreasing",
      severity: "moderate",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Communication response tracking",
      classification: "Calculated",
    },
  ] as StakeholderSignal[],
  
  sentiment: [
    {
      id: "sentiment-002",
      stakeholderId: "stakeholder-003",
      project: "Demo Project B",
      geography: "Eastern District",
      date: "2026-09-24",
      trust: 45,
      satisfaction: 40,
      perceivedFairness: 50,
      confidenceInCommitments: 42,
      willingnessToCooperate: 48,
      overallSentiment: 45,
      sentimentTrend: "declining",
      evidenceSource: "Community survey",
      sampleInformation: "32 respondents",
      classification: "Observed",
    },
    {
      id: "sentiment-003",
      stakeholderId: "stakeholder-003",
      project: "Demo Project B",
      geography: "Eastern District",
      date: "2026-09-15",
      trust: 55,
      satisfaction: 50,
      perceivedFairness: 60,
      confidenceInCommitments: 52,
      willingnessToCooperate: 58,
      overallSentiment: 55,
      sentimentTrend: "declining",
      evidenceSource: "Community survey",
      sampleInformation: "28 respondents",
      classification: "Observed",
    },
  ] as SentimentObservation[],
  
  behaviour: [
    {
      id: "behaviour-002",
      stakeholderId: "stakeholder-003",
      project: "Demo Project B",
      behaviourType: "declining_participation",
      category: "warning",
      dateTime: "2026-09-24T14:00:00Z",
      location: "Community Center",
      direction: "decreasing",
      severity: "moderate",
      trigger: "Perceived lack of project responsiveness",
      evidence: "Attendance dropped from 75% to 45% over past month",
      outcome: "Under review",
      classification: "Observed",
    },
  ] as BehaviourObservation[],
  
  events: [] as StakeholderEvent[],
  
  outcomes: [] as ProjectOutcome[],
  
  consequences: [] as ConsequenceObservation[],
};

// ------------------------------------------------------------
// SCENARIO C: ESCALATING GRIEVANCES
// ------------------------------------------------------------

export const scenarioC = {
  name: "Escalating Grievances",
  description: "Demonstrates increasing grievance frequency and escalation patterns.",
  
  stakeholders: [
    {
      id: "stakeholder-004",
      name: "Affected Property Owners Group",
      type: "community",
      project: "Demo Project C",
      geographicContext: "Southern District",
      influencePower: 70,
      status: "opposed",
    },
  ] as Stakeholder[],
  
  signals: [
    {
      id: "signal-005",
      stakeholderId: "stakeholder-004",
      project: "Demo Project C",
      signalType: "grievance_frequency",
      value: 12,
      direction: "increasing",
      severity: "high",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Grievance register",
      classification: "Observed",
    },
    {
      id: "signal-006",
      stakeholderId: "stakeholder-004",
      project: "Demo Project C",
      signalType: "grievance_escalation",
      value: 8,
      direction: "increasing",
      severity: "high",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Escalation tracking",
      classification: "Calculated",
    },
    {
      id: "signal-007",
      stakeholderId: "stakeholder-004",
      project: "Demo Project C",
      signalType: "unresolved_grievances",
      value: 15,
      direction: "increasing",
      severity: "critical",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Grievance tracking",
      classification: "Calculated",
    },
  ] as StakeholderSignal[],
  
  sentiment: [
    {
      id: "sentiment-004",
      stakeholderId: "stakeholder-004",
      project: "Demo Project C",
      geography: "Southern District",
      date: "2026-09-24",
      trust: 25,
      satisfaction: 20,
      perceivedFairness: 30,
      confidenceInCommitments: 22,
      willingnessToCooperate: 18,
      overallSentiment: 23,
      sentimentTrend: "declining",
      evidenceSource: "Grievance analysis",
      sampleInformation: "Grievance feedback",
      classification: "Inferred",
    },
  ] as SentimentObservation[],
  
  behaviour: [
    {
      id: "behaviour-003",
      stakeholderId: "stakeholder-004",
      project: "Demo Project C",
      behaviourType: "escalating_complaints",
      category: "warning",
      dateTime: "2026-09-24T14:00:00Z",
      location: "Project Office",
      direction: "increasing",
      severity: "high",
      trigger: "Unresolved compensation issues",
      evidence: "5 formal complaints escalated in past 2 weeks",
      outcome: "Under investigation",
      classification: "Observed",
    },
  ] as BehaviourObservation[],
  
  events: [
    {
      id: "event-001",
      project: "Demo Project C",
      stakeholderId: "stakeholder-004",
      eventType: "formal_dispute",
      eventCategory: "legal",
      dateTime: "2026-09-20T09:00:00Z",
      location: "Project Site",
      severity: "high",
      trigger: "Compensation dispute",
      evidence: "Formal dispute notification filed",
      status: "ongoing",
      outcome: "Pending resolution",
      classification: "Observed",
    },
  ] as StakeholderEvent[],
  
  outcomes: [
    {
      id: "outcome-001",
      project: "Demo Project C",
      outcomeType: "grievance_escalation",
      description: "Grievance escalation to formal dispute process",
      dateTime: "2026-09-20T09:00:00Z",
      actual: true,
      classification: "Observed",
    },
  ] as ProjectOutcome[],
  
  consequences: [
    {
      id: "consequence-001",
      project: "Demo Project C",
      relatedEventId: "event-001",
      consequenceType: "cost",
      description: "Legal and negotiation costs associated with dispute",
      estimated: true,
      actual: false,
      classification: "Inferred",
      details: {
        legalCost: "Ongoing legal representation",
      },
    },
  ] as ConsequenceObservation[],
};

// ------------------------------------------------------------
// SCENARIO D: DETERIORATING SENTIMENT + ADVERSE BEHAVIOUR
// ------------------------------------------------------------

export const scenarioD = {
  name: "Deteriorating Sentiment + Adverse Behaviour",
  description: "Demonstrates the progression from deteriorating sentiment to adverse behaviour.",
  
  stakeholders: [
    {
      id: "stakeholder-005",
      name: "Labor Union Chapter",
      type: "labor",
      project: "Demo Project D",
      geographicContext: "Western District",
      influencePower: 80,
      status: "opposed",
    },
  ] as Stakeholder[],
  
  signals: [
    {
      id: "signal-008",
      stakeholderId: "stakeholder-005",
      project: "Demo Project D",
      signalType: "engagement_frequency",
      value: 20,
      direction: "decreasing",
      severity: "high",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Engagement tracking",
      classification: "Observed",
    },
    {
      id: "signal-009",
      stakeholderId: "stakeholder-005",
      project: "Demo Project D",
      signalType: "cooperation_indicators",
      value: 15,
      direction: "decreasing",
      severity: "critical",
      dateTime: "2026-09-24T10:00:00Z",
      evidenceSource: "Cooperation assessment",
      classification: "Inferred",
    },
  ] as StakeholderSignal[],
  
  sentiment: [
    {
      id: "sentiment-005",
      stakeholderId: "stakeholder-005",
      project: "Demo Project D",
      geography: "Western District",
      date: "2026-09-24",
      trust: 15,
      satisfaction: 18,
      perceivedFairness: 20,
      confidenceInCommitments: 12,
      willingnessToCooperate: 10,
      overallSentiment: 15,
      sentimentTrend: "declining",
      evidenceSource: "Union leadership feedback",
      sampleInformation: "Leadership council",
      classification: "Observed",
    },
  ] as SentimentObservation[],
  
  behaviour: [
    {
      id: "behaviour-004",
      stakeholderId: "stakeholder-005",
      project: "Demo Project D",
      behaviourType: "refusal_to_engage",
      category: "warning",
      dateTime: "2026-09-22T10:00:00Z",
      location: "Project Office",
      direction: "stable",
      severity: "high",
      trigger: "Wage negotiation breakdown",
      evidence: "Union declined invitation to mediation meeting",
      outcome: "Mediation postponed",
      classification: "Observed",
    },
    {
      id: "behaviour-005",
      stakeholderId: "stakeholder-005",
      project: "Demo Project D",
      behaviourType: "organised_opposition",
      category: "adverse",
      dateTime: "2026-09-24T08:00:00Z",
      location: "Site Entrance",
      direction: "increasing",
      severity: "high",
      trigger: "Continued wage dispute",
      evidence: "Union members staged information picket at site entrance",
      outcome: "Under review",
      classification: "Observed",
    },
  ] as BehaviourObservation[],
  
  events: [
    {
      id: "event-002",
      project: "Demo Project D",
      stakeholderId: "stakeholder-005",
      eventType: "protest",
      eventCategory: "social",
      dateTime: "2026-09-24T08:00:00Z",
      location: "Site Entrance",
      severity: "high",
      trigger: "Wage negotiation impasse",
      evidence: "Peaceful information picket observed",
      status: "ongoing",
      outcome: "No work interruption reported",
      classification: "Observed",
    },
  ] as StakeholderEvent[],
  
  outcomes: [
    {
      id: "outcome-002",
      project: "Demo Project D",
      outcomeType: "work_interruption",
      description: "Potential work interruption due to protest",
      dateTime: "2026-09-24T08:00:00Z",
      actual: false,
      estimated: true,
      classification: "Inferred",
    },
  ] as ProjectOutcome[],
  
  consequences: [
    {
      id: "consequence-002",
      project: "Demo Project D",
      relatedEventId: "event-002",
      consequenceType: "activities",
      description: "Site access considerations during protest",
      estimated: true,
      actual: false,
      classification: "Inferred",
      details: {
        disruptedActivity: "Site access",
        criticalPathImpact: false,
      },
    },
  ] as ConsequenceObservation[],
};

// ------------------------------------------------------------
// SCENARIO E: SIGNALS FOLLOWED BY ACTUAL DISRUPTION EVENT
// ------------------------------------------------------------

export const scenarioE = {
  name: "Signals Followed by Actual Disruption Event",
  description: "Demonstrates the complete evidence chain from signals to actual event and consequences.",
  
  stakeholders: [
    {
      id: "stakeholder-006",
      name: "Environmental Action Group",
      type: "ngp",
      project: "Demo Project E",
      geographicContext: "Coastal Region",
      influencePower: 85,
      status: "opposed",
    },
  ] as Stakeholder[],
  
  // Historical signals leading up to event
  signals: [
    {
      id: "signal-010",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      signalType: "grievance_frequency",
      value: 8,
      direction: "increasing",
      severity: "moderate",
      dateTime: "2026-09-10T10:00:00Z",
      evidenceSource: "Grievance register",
      classification: "Observed",
    },
    {
      id: "signal-011",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      signalType: "grievance_frequency",
      value: 15,
      direction: "increasing",
      severity: "high",
      dateTime: "2026-09-15T10:00:00Z",
      evidenceSource: "Grievance register",
      classification: "Observed",
    },
    {
      id: "signal-012",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      signalType: "grievance_frequency",
      value: 22,
      direction: "increasing",
      severity: "critical",
      dateTime: "2026-09-20T10:00:00Z",
      evidenceSource: "Grievance register",
      classification: "Observed",
    },
    {
      id: "signal-013",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      signalType: "institutional_response",
      value: "escalation",
      direction: "increasing",
      severity: "high",
      dateTime: "2026-09-22T10:00:00Z",
      evidenceSource: "Institutional correspondence",
      classification: "Observed",
    },
  ] as StakeholderSignal[],
  
  // Historical sentiment deterioration
  sentiment: [
    {
      id: "sentiment-006",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      geography: "Coastal Region",
      date: "2026-09-10",
      trust: 50,
      satisfaction: 45,
      perceivedFairness: 48,
      confidenceInCommitments: 42,
      willingnessToCooperate: 40,
      overallSentiment: 45,
      sentimentTrend: "declining",
      evidenceSource: "Environmental impact assessment feedback",
      sampleInformation: "Public comments",
      classification: "Observed",
    },
    {
      id: "sentiment-007",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      geography: "Coastal Region",
      date: "2026-09-15",
      trust: 35,
      satisfaction: 30,
      perceivedFairness: 32,
      confidenceInCommitments: 28,
      willingnessToCooperate: 25,
      overallSentiment: 30,
      sentimentTrend: "declining",
      evidenceSource: "Public meeting feedback",
      sampleInformation: "Meeting participants",
      classification: "Observed",
    },
    {
      id: "sentiment-008",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      geography: "Coastal Region",
      date: "2026-09-20",
      trust: 20,
      satisfaction: 15,
      perceivedFairness: 18,
      confidenceInCommitments: 15,
      willingnessToCooperate: 12,
      overallSentiment: 16,
      sentimentTrend: "declining",
      evidenceSource: "Protest participant feedback",
      sampleInformation: "Protest interviews",
      classification: "Observed",
    },
  ] as SentimentObservation[],
  
  // Behaviour escalation pattern
  behaviour: [
    {
      id: "behaviour-006",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      behaviourType: "escalating_complaints",
      category: "warning",
      dateTime: "2026-09-15T14:00:00Z",
      location: "Project Office",
      direction: "increasing",
      severity: "moderate",
      trigger: "Environmental impact concerns",
      evidence: "Formal complaint regarding environmental permits",
      outcome: "Under review",
      classification: "Observed",
    },
    {
      id: "behaviour-007",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      behaviourType: "organised_opposition",
      category: "adverse",
      dateTime: "2026-09-20T08:00:00Z",
      location: "Regulatory Office",
      direction: "increasing",
      severity: "high",
      trigger: "Permit denial appeal",
      evidence: "Organised protest at environmental regulator",
      outcome: "Under investigation",
      classification: "Observed",
    },
    {
      id: "behaviour-008",
      stakeholderId: "stakeholder-006",
      project: "Demo Project E",
      behaviourType: "site_obstruction",
      category: "adverse",
      dateTime: "2026-09-23T06:00:00Z",
      location: "Site Access Road",
      direction: "increasing",
      severity: "critical",
      trigger: "Construction commencement without final permits",
      evidence: "Site access blocked by protesters",
      outcome: "Work interruption",
      classification: "Observed",
    },
  ] as BehaviourObservation[],
  
  // Actual disruption event
  events: [
    {
      id: "event-003",
      project: "Demo Project E",
      stakeholderId: "stakeholder-006",
      eventType: "road_blockage",
      eventCategory: "access",
      dateTime: "2026-09-23T06:00:00Z",
      location: "Site Access Road",
      severity: "critical",
      trigger: "Construction commencement",
      evidence: "Protesters blocked access road with vehicles",
      status: "resolved",
      outcome: "Access restored after 8 hours, negotiations ongoing",
      classification: "Observed",
    },
    {
      id: "event-004",
      project: "Demo Project E",
      stakeholderId: "stakeholder-006",
      eventType: "work_interruption",
      eventCategory: "operational",
      dateTime: "2026-09-23T06:00:00Z",
      location: "Construction Site",
      severity: "high",
      trigger: "Site access blockage",
      evidence: "Construction activities halted due to access issues",
      status: "resolved",
      outcome: "Work resumed after access restored",
      classification: "Observed",
    },
  ] as StakeholderEvent[],
  
  // Actual project outcomes
  outcomes: [
    {
      id: "outcome-003",
      project: "Demo Project E",
      outcomeType: "delay",
      description: "8-hour work delay due to site access blockage",
      dateTime: "2026-09-23T14:00:00Z",
      actual: true,
      classification: "Observed",
    },
    {
      id: "outcome-004",
      project: "Demo Project E",
      outcomeType: "work_interruption",
      description: "Construction activities interrupted for 8 hours",
      dateTime: "2026-09-23T14:00:00Z",
      actual: true,
      classification: "Observed",
    },
  ] as ProjectOutcome[],
  
  // Actual consequences
  consequences: [
    {
      id: "consequence-003",
      project: "Demo Project E",
      relatedEventId: "event-003",
      consequenceType: "time",
      description: "Work delay due to access blockage",
      estimated: false,
      actual: true,
      classification: "Observed",
      details: {
        actualDelay: "8 hours",
      },
    },
    {
      id: "consequence-004",
      project: "Demo Project E",
      relatedEventId: "event-003",
      consequenceType: "cost",
      description: "Standby costs during work interruption",
      estimated: false,
      actual: true,
      classification: "Calculated",
      details: {
        standbyCost: "Contractor standby costs for 8-hour period",
        additionalEngagementCost: "Emergency negotiation costs",
      },
    },
    {
      id: "consequence-005",
      project: "Demo Project E",
      relatedEventId: "event-003",
      consequenceType: "people",
      description: "Workers affected by work interruption",
      estimated: false,
      actual: true,
      classification: "Observed",
      details: {
        workersAffected: 45,
      },
    },
  ] as ConsequenceObservation[],
  
  // Example prediction architecture (not currently functional)
  predictions: [
    {
      id: "prediction-001",
      project: "Demo Project E",
      predictionTarget: "event_occurrence",
      targetEvent: "access_disruption",
      predictionDate: "2026-09-22T10:00:00Z",
      forecastWindow: "7 days",
      supportingEvidence: [
        "signal-012",
        "sentiment-008",
        "behaviour-007",
      ],
      modelMethod: "Not implemented - architecture demonstration only",
      predictionStatus: "monitoring",
      classification: "Predicted",
      metadata: {
        note: "This prediction architecture is for research purposes only. No reliable probability calculation exists.",
      },
    },
  ] as Prediction[],
  
  // Example prediction outcome (for future validation)
  predictionOutcomes: [
    {
      id: "prediction-outcome-001",
      predictionId: "prediction-001",
      actualEvent: "event-003",
      occurred: true,
      actualDate: "2026-09-23T06:00:00Z",
      actualSeverity: "critical",
      actualConsequence: "8-hour work delay",
      validationStatus: "confirmed",
      validationNotes: "Predicted event occurred within forecast window. This is a single case and does not validate predictive methodology.",
      classification: "Observed",
    },
  ] as PredictionOutcome[],
};

// ------------------------------------------------------------
// SCENARIO HELPER FUNCTIONS
// ------------------------------------------------------------

export function getAllScenarios() {
  return {
    scenarioA,
    scenarioB,
    scenarioC,
    scenarioD,
    scenarioE,
  };
}

export function getScenarioByName(name: string) {
  const scenarios = getAllScenarios();
  return scenarios[`scenario${name.slice(-1)}` as keyof typeof scenarios];
}