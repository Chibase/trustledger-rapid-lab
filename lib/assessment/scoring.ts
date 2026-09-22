import type {
  AssessmentResponse,
  DimensionResult,
} from "@/types/assessment";

import { assessmentDimensions } from "./dimensions";

const RESPONSE_MAX = 4;

function roundScore(value: number): number {
  return Math.round(value * 10) / 10;
}

function isResponse(
  response: AssessmentResponse | undefined,
): response is AssessmentResponse {
  return response !== undefined;
}

export function calculateDimensionScore(
  dimensionId: string,
  responses: AssessmentResponse[],
): DimensionResult {
  const dimension = assessmentDimensions.find(
    (item) => item.id === dimensionId,
  );

  if (!dimension) {
    throw new Error(`Unknown assessment dimension: ${dimensionId}`);
  }

  const dimensionResponses = dimension.questionIds.map((questionId) =>
    responses.find((response) => response.questionId === questionId),
  );

  const unansweredQuestions = dimensionResponses.filter(
    (response) => response === undefined,
  );

  if (unansweredQuestions.length > 0) {
    throw new Error(
      `Dimension ${dimension.name} has ${unansweredQuestions.length} unanswered question(s).`,
    );
  }

  const completeResponses = dimensionResponses.filter(isResponse);

  const applicableResponses = completeResponses.filter(
    (response) => !response.notApplicable,
  );

  const unansweredResponses = applicableResponses.filter(
    (response) => response.value === undefined,
  );

  if (unansweredResponses.length > 0) {
    throw new Error(
      `Dimension ${dimension.name} has ${unansweredResponses.length} unanswered applicable question(s).`,
    );
  }

  const answeredResponses = applicableResponses.filter(
    (response) => response.value !== undefined,
  );

  const applicableQuestions = applicableResponses.length;
  const answeredQuestions = answeredResponses.length;

  const actualPoints = answeredResponses.reduce(
    (total, response) => total + (response.value ?? 0),
    0,
  );

  const maximumApplicablePoints = applicableQuestions * RESPONSE_MAX;

  const score =
    maximumApplicablePoints === 0
      ? 0
      : roundScore((actualPoints / maximumApplicablePoints) * 100);

  return {
    dimensionId,
    score,
    applicableQuestions,
    answeredQuestions,
  };
}

export function calculateOverallScore(
  dimensionResults: DimensionResult[],
): number {
  const applicableDimensions = dimensionResults.filter(
    (result) => result.applicableQuestions > 0,
  );

  if (applicableDimensions.length === 0) {
    return 0;
  }

  const total = applicableDimensions.reduce(
    (sum, result) => sum + result.score,
    0,
  );

  return roundScore(total / applicableDimensions.length);
}

export function calculateAssessmentScores(
  responses: AssessmentResponse[],
): {
  overallScore: number;
  dimensionResults: DimensionResult[];
} {
  const dimensionResults = assessmentDimensions.map((dimension) =>
    calculateDimensionScore(dimension.id, responses),
  );

  return {
    overallScore: calculateOverallScore(dimensionResults),
    dimensionResults,
  };
}