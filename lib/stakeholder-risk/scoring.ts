import type {
  RiskResponse,
  ConditionResult,
  RiskLensResult,
} from "@/types/stakeholder-risk";

import { stakeholderConditions } from "./domains";
import { riskQuestions } from "./questions";

const RESPONSE_MAX = 4;

function roundScore(value: number): number {
  return Math.round(value * 10) / 10;
}

function isResponse(
  response: RiskResponse | undefined,
): response is RiskResponse {
  return response !== undefined;
}

export function calculateConditionScore(
  conditionId: string,
  responses: RiskResponse[],
): ConditionResult {
  const condition = stakeholderConditions.find(
    (item) => item.id === conditionId,
  );

  if (!condition) {
    throw new Error(`Unknown stakeholder condition: ${conditionId}`);
  }

  const conditionResponses = condition.questionIds.map((questionId) =>
    responses.find((response) => response.questionId === questionId),
  );

  const unansweredQuestions = conditionResponses.filter(
    (response) => response === undefined,
  );

  if (unansweredQuestions.length > 0) {
    throw new Error(
      `Condition ${condition.name} has ${unansweredQuestions.length} unanswered question(s).`,
    );
  }

  const completeResponses = conditionResponses.filter(isResponse);

  const applicableResponses = completeResponses.filter(
    (response) => !response.notApplicable,
  );

  const unansweredResponses = applicableResponses.filter(
    (response) => response.value === undefined,
  );

  if (unansweredResponses.length > 0) {
    throw new Error(
      `Condition ${condition.name} has ${unansweredResponses.length} unanswered applicable question(s).`,
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
    conditionId,
    score,
    applicableQuestions,
    answeredQuestions,
  };
}

export function calculateRiskLensScores(
  conditionResults: ConditionResult[],
  responses: RiskResponse[],
): RiskLensResult[] {
  const riskLensMap = new Map<
    string,
    { totalScore: number; count: number; contributingConditions: Set<string> }
  >();

  for (const conditionResult of conditionResults) {
    const conditionQuestions = riskQuestions.filter(
      (q) => q.conditionId === conditionResult.conditionId,
    );

    for (const question of conditionQuestions) {
      const response = responses.find(
        (r) => r.questionId === question.id,
      );

      // Skip if not applicable or no response
      if (!response || response.notApplicable || response.value === undefined) {
        continue;
      }

      // Convert 0-4 response to percentage (0-100)
      const questionScore = (response.value / RESPONSE_MAX) * 100;

      for (const lens of question.riskLenses) {
        if (!riskLensMap.has(lens)) {
          riskLensMap.set(lens, {
            totalScore: 0,
            count: 0,
            contributingConditions: new Set(),
          });
        }

        const lensData = riskLensMap.get(lens)!;
        lensData.totalScore += questionScore;
        lensData.count += 1;
        lensData.contributingConditions.add(conditionResult.conditionId);
      }
    }
  }

  return Array.from(riskLensMap.entries()).map(([lens, data]) => ({
    lens: lens as any,
    score: roundScore(data.totalScore / data.count),
    contributingConditions: Array.from(data.contributingConditions),
  }));
}

export function calculateOverallConditionScore(
  conditionResults: ConditionResult[],
): number {
  const applicableConditions = conditionResults.filter(
    (result) => result.applicableQuestions > 0,
  );

  if (applicableConditions.length === 0) {
    return 0;
  }

  const total = applicableConditions.reduce(
    (sum, result) => sum + result.score,
    0,
  );

  return roundScore(total / applicableConditions.length);
}

export function calculateOverallRiskExposure(
  riskLensResults: RiskLensResult[],
): number {
  if (riskLensResults.length === 0) {
    return 0;
  }

  const total = riskLensResults.reduce(
    (sum, result) => sum + result.score,
    0,
  );

  return roundScore(total / riskLensResults.length);
}

export function calculateRiskScores(
  responses: RiskResponse[],
): {
  overallConditionScore: number;
  overallRiskExposure: number;
  conditionResults: ConditionResult[];
  riskLensResults: RiskLensResult[];
} {
  const conditionResults = stakeholderConditions.map((condition) =>
    calculateConditionScore(condition.id, responses),
  );

  const riskLensResults = calculateRiskLensScores(conditionResults, responses);

  return {
    overallConditionScore: calculateOverallConditionScore(conditionResults),
    overallRiskExposure: calculateOverallRiskExposure(riskLensResults),
    conditionResults,
    riskLensResults,
  };
}
