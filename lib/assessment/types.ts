export type ResponseValue = 0 | 1 | 2 | 3 | 4 | "NA";

export const RESPONSE_LABELS: Record<number, string> = {
  0: "Not started",
  1: "Initial / Ad-hoc",
  2: "Developing",
  3: "Established",
  4: "Leading",
};

export const RESPONSE_DESCRIPTIONS: Record<number, string> = {
  0: "No evidence of this practice exists yet.",
  1: "Practice exists informally or inconsistently, without structure.",
  2: "Practice is being developed but not yet fully implemented or systematic.",
  3: "Practice is established, documented, and consistently applied.",
  4: "Practice is exemplary, continuously improved, and could serve as a model.",
};

export interface ProjectProfile {
  projectName: string;
  location: string;
  sector: string;
  phase: string;
  assessor: string;
  assessmentDate: string;
  description: string;
}

export interface Dimension {
  id: string;
  name: string;
  shortName: string;
  description: string;
  order: number;
}

export interface Question {
  id: string;
  dimensionId: string;
  text: string;
  guidance: string;
  order: number;
}

export interface ResponseRecord {
  questionId: string;
  value: ResponseValue;
}

export interface InterpretationBand {
  label: string;
  min: number;
  max: number;
  description: string;
  color: string;
}

export interface DimensionResult {
  dimensionId: string;
  dimensionName: string;
  dimensionShortName: string;
  score: number;
  applicableQuestions: number;
  naQuestions: number;
  actualPoints: number;
  maxApplicablePoints: number;
  band: InterpretationBand;
  isPriority: boolean;
  isStrength: boolean;
  isApplicable: boolean;
}

export interface Recommendation {
  dimensionId: string;
  dimensionName: string;
  priority: "high" | "medium";
  action: string;
}

export interface AssessmentResult {
  overallReadiness: number;
  band: InterpretationBand;
  dimensionResults: DimensionResult[];
  strengths: DimensionResult[];
  priorityAreas: DimensionResult[];
  systemicConsiderations: string[];
  recommendedActions: Recommendation[];
}

export interface Assessment {
  id: string;
  projectProfile: ProjectProfile;
  responses: Record<string, ResponseValue>;
  currentDimensionIndex: number;
  startedAt: string;
  updatedAt: string;
  completed: boolean;
  isDemo: boolean;
}

export type AssessmentStage =
  | "landing"
  | "profile"
  | "questionnaire"
  | "results"
  | "report";
