import type {
  AssessmentResponse,
  AssessmentResult,
} from "@/types/assessment";

import { calculateAssessmentScores } from "./scoring";
import { interpretReadiness } from "./interpretation";
import { getAssessmentRecommendations } from "./recommendations";

export type CompleteAssessmentResult = AssessmentResult & {
  recommendations: ReturnType<typeof getAssessmentRecommendations>;
};

export function buildAssessmentResult(
  responses: AssessmentResponse[],
): CompleteAssessmentResult {
  const { overallScore, dimensionResults } =
    calculateAssessmentScores(responses);

  const interpretation = interpretReadiness(overallScore);

  const recommendations = getAssessmentRecommendations(
    dimensionResults.map((result) => ({
      dimensionId: result.dimensionId,
      score: result.score,
    })),
  );

  return {
    overallScore,
    dimensionResults,
    band: interpretation.band,
    priority: interpretation.priority,
    description: interpretation.description,
    strengths: [],
    priorities: [],
    recommendations,
  };
}