export type ResponseValue = 0 | 1 | 2 | 3 | 4;

export type AssessmentResponse = {
  questionId: string;
  value?: ResponseValue;
  notApplicable?: boolean;
};

export type AssessmentProject = {
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

export type AssessmentQuestion = {
  id: string;
  dimensionId: string;
  text: string;
  helpText?: string;
};

export type AssessmentDimension = {
  id: string;
  name: string;
  description: string;
  questionIds: string[];
};

export type DimensionResult = {
  dimensionId: string;
  score: number;
  applicableQuestions: number;
  answeredQuestions: number;
};

export type AssessmentResult = {
  overallScore: number;
  dimensionResults: DimensionResult[];
  strengths: string[];
  priorities: string[];
};

export type Assessment = {
  id: string;
  project: AssessmentProject;
  responses: AssessmentResponse[];
  startedAt: string;
  completedAt?: string;
};
