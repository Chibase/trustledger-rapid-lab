export type ResponseValue = 0 | 1 | 2 | 3 | 4;

export type RiskLens = 
  | "financial"
  | "operational"
  | "regulatory"
  | "environmental"
  | "social"
  | "political"
  | "reputational"
  | "market"
  | "institutional"
  | "change";

export type EvidenceClassification = 
  | "Observed"
  | "Calculated"
  | "Inferred"
  | "Predicted";

export type RiskResponse = {
  questionId: string;
  value?: ResponseValue;
  notApplicable?: boolean;
};

export type RiskProject = {
  name: string;
  type: string;
  location: string;
  stage: string;
  sponsor: string;
  assessmentDate: string;
  approximateValue?: string;
  affectedCommunity?: string;
  respondentRole?: string;
};

export type RiskQuestion = {
  id: string;
  conditionId: string;
  text: string;
  helpText?: string;
  riskLenses: RiskLens[];
};

export type StakeholderCondition = {
  id: string;
  name: string;
  description: string;
  questionIds: string[];
};

export type ConditionResult = {
  conditionId: string;
  score: number;
  applicableQuestions: number;
  answeredQuestions: number;
};

export type RiskLensResult = {
  lens: RiskLens;
  score: number;
  contributingConditions: string[];
};

export type RiskResult = {
  overallConditionScore: number;
  overallRiskExposure: number;
  conditionResults: ConditionResult[];
  riskLensResults: RiskLensResult[];
  conditionBand: string;
  riskBand: string;
  priority: string;
  description: string;
  strengths: string[];
  priorities: string[];
};

export type RiskAssessment = {
  id: string;
  project: RiskProject;
  responses: RiskResponse[];
  startedAt: string;
  completedAt?: string;
};

// ------------------------------------------------------------
// STAKEHOLDER MODEL
// ------------------------------------------------------------

export type StakeholderType = 
  | "community"
  | "business"
  | "government"
  | "regulator"
  | "institution"
  | "ngp"
  | "labor"
  | "indigenous"
  | "other";

export type StakeholderStatus = 
  | "active"
  | "passive"
  | "opposed"
  | "supportive"
  | "neutral"
  | "unknown";

export type Stakeholder = {
  id: string;
  name: string;
  type: StakeholderType;
  project: string;
  geographicContext?: string;
  influencePower?: number; // 0-100 scale
  status: StakeholderStatus;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// STAKEHOLDER SIGNAL MODEL
// ------------------------------------------------------------

export type SignalType = 
  | "meeting_attendance"
  | "participation_rate"
  | "response_rate"
  | "grievance_frequency"
  | "grievance_escalation"
  | "unresolved_grievances"
  | "commitment_completion"
  | "overdue_commitments"
  | "engagement_frequency"
  | "institutional_response"
  | "intervention"
  | "cooperation_indicators"
  | "other";

export type SignalDirection = 
  | "increasing"
  | "decreasing"
  | "stable"
  | "fluctuating"
  | "unknown";

export type SignalSeverity = 
  | "low"
  | "moderate"
  | "high"
  | "critical"
  | "unknown";

export type StakeholderSignal = {
  id: string;
  stakeholderId: string;
  project: string;
  signalType: SignalType;
  value: number | string | boolean;
  direction?: SignalDirection;
  severity?: SignalSeverity;
  dateTime: string;
  geographicContext?: string;
  evidenceSource: string;
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// SENTIMENT OBSERVATION MODEL
// ------------------------------------------------------------

export type SentimentTrend = 
  | "improving"
  | "declining"
  | "stable"
  | "fluctuating"
  | "unknown";

export type SentimentObservation = {
  id: string;
  stakeholderId: string;
  project: string;
  geography?: string;
  date: string;
  trust?: number; // 0-100 scale
  satisfaction?: number; // 0-100 scale
  perceivedFairness?: number; // 0-100 scale
  confidenceInCommitments?: number; // 0-100 scale
  willingnessToCooperate?: number; // 0-100 scale
  overallSentiment?: number; // 0-100 scale
  sentimentTrend?: SentimentTrend;
  evidenceSource: string;
  sampleInformation?: string;
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// BEHAVIOUR OBSERVATION MODEL
// ------------------------------------------------------------

export type BehaviourType = 
  | "meeting_attendance"
  | "information_sharing"
  | "participation"
  | "agreement"
  | "grievance_resolution"
  | "declining_participation"
  | "repeated_non_attendance"
  | "escalating_complaints"
  | "refusal_to_engage"
  | "missed_commitments"
  | "organised_opposition"
  | "access_obstruction"
  | "protest"
  | "work_interruption"
  | "site_occupation"
  | "formal_escalation"
  | "litigation"
  | "other";

export type BehaviourCategory = 
  | "constructive"
  | "warning"
  | "adverse";

export type BehaviourObservation = {
  id: string;
  stakeholderId: string;
  project: string;
  behaviourType: BehaviourType;
  category: BehaviourCategory;
  dateTime: string;
  location?: string;
  direction?: SignalDirection;
  severity?: SignalSeverity;
  trigger?: string;
  evidence: string;
  outcome?: string;
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// STAKEHOLDER EVENT MODEL
// ------------------------------------------------------------

export type EventType = 
  | "access_restriction"
  | "road_blockage"
  | "site_obstruction"
  | "work_interruption"
  | "contractor_disruption"
  | "workforce_disruption"
  | "community_mobilisation"
  | "protest"
  | "conflict_escalation"
  | "political_intervention"
  | "institutional_intervention"
  | "institutional_escalation"
  | "regulatory_intervention"
  | "legal_complaint"
  | "formal_dispute"
  | "litigation"
  | "public_escalation"
  | "media_escalation"
  | "reputational_incident"
  | "other";

export type EventCategory = 
  | "access"
  | "operational"
  | "social"
  | "governance"
  | "legal"
  | "reputational";

export type EventStatus = 
  | "ongoing"
  | "resolved"
  | "escalated"
  | "dormant"
  | "unknown";

export type StakeholderEvent = {
  id: string;
  project: string;
  stakeholderId?: string;
  eventType: EventType;
  eventCategory: EventCategory;
  dateTime: string;
  location?: string;
  severity?: SignalSeverity;
  trigger?: string;
  evidence: string;
  status: EventStatus;
  outcome?: string;
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// PROJECT OUTCOME MODEL
// ------------------------------------------------------------

export type OutcomeType = 
  | "delay"
  | "work_interruption"
  | "access_disruption"
  | "contractor_disruption"
  | "workforce_disruption"
  | "grievance_escalation"
  | "institutional_intervention"
  | "legal_escalation"
  | "cost_increase"
  | "schedule_impact"
  | "reputational_impact"
  | "other";

export type ProjectOutcome = {
  id: string;
  project: string;
  outcomeType: OutcomeType;
  description: string;
  dateTime: string;
  actual: boolean;
  estimated?: boolean;
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// CONSEQUENCE MODEL
// ------------------------------------------------------------

export type ConsequenceType = 
  | "time"
  | "people"
  | "resources"
  | "activities"
  | "cost"
  | "procurement"
  | "financing"
  | "reputational"
  | "other";

export type ConsequenceObservation = {
  id: string;
  project: string;
  relatedEventId?: string;
  consequenceType: ConsequenceType;
  description: string;
  estimated?: boolean;
  actual?: boolean;
  classification: EvidenceClassification;
  details?: {
    // Time consequences
    expectedDelay?: string;
    actualDelay?: string;
    
    // People consequences
    workersAffected?: number;
    stakeholdersAffected?: number;
    
    // Resource consequences
    equipmentStandby?: string;
    contractorStandby?: string;
    additionalPersonnel?: string;
    
    // Activity consequences
    disruptedActivity?: string;
    criticalPathImpact?: boolean;
    
    // Cost consequences
    standbyCost?: string;
    additionalEngagementCost?: string;
    securityCost?: string;
    legalCost?: string;
    remediationCost?: string;
    
    // Other consequences
    procurementImpact?: string;
    financingImpact?: string;
    reputationalImpact?: string;
  };
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// PREDICTION MODEL
// ------------------------------------------------------------

export type PredictionTarget = 
  | "event_occurrence"
  | "event_severity"
  | "consequence_magnitude"
  | "sentiment_change"
  | "behaviour_change"
  | "other";

export type PredictionStatus = 
  | "forecast"
  | "monitoring"
  | "validated"
  | "invalidated"
  | "unknown";

export type Prediction = {
  id: string;
  project: string;
  predictionTarget: PredictionTarget;
  targetEvent?: string;
  targetOutcome?: string;
  predictionDate: string;
  forecastWindow?: string; // e.g., "30 days"
  supportingEvidence: string[];
  modelMethod?: string;
  predictionStatus: PredictionStatus;
  confidence?: number; // Only when genuine methodology exists
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};

// ------------------------------------------------------------
// PREDICTION OUTCOME MODEL
// ------------------------------------------------------------

export type ValidationStatus = 
  | "pending"
  | "confirmed"
  | "rejected"
  | "partial"
  | "inconclusive"
  | "unknown";

export type PredictionOutcome = {
  id: string;
  predictionId: string;
  actualEvent?: string;
  actualOutcome?: string;
  occurred: boolean;
  actualDate?: string;
  actualSeverity?: SignalSeverity;
  actualConsequence?: string;
  validationStatus: ValidationStatus;
  validationNotes?: string;
  classification: EvidenceClassification;
  metadata?: Record<string, unknown>;
};
