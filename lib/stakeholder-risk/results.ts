import type {
  RiskResponse,
  RiskResult,
} from "@/types/stakeholder-risk";

import { calculateRiskScores } from "./scoring";
import { interpretRisk } from "./interpretation";
import { getRiskRecommendations } from "./recommendations";

export type CompleteRiskResult = RiskResult & {
  recommendations: ReturnType<typeof getRiskRecommendations>;
};

export function buildRiskResult(
  responses: RiskResponse[],
): CompleteRiskResult {
  const {
    overallConditionScore,
    overallRiskExposure,
    conditionResults,
    riskLensResults,
  } = calculateRiskScores(responses);

  const interpretation = interpretRisk(
    overallConditionScore,
    overallRiskExposure,
  );

  const recommendations = getRiskRecommendations(
    conditionResults.map((result) => ({
      conditionId: result.conditionId,
      score: result.score,
    })),
  );

  return {
    overallConditionScore,
    overallRiskExposure,
    conditionResults,
    riskLensResults,
    conditionBand: interpretation.conditionBand,
    riskBand: interpretation.riskBand,
    priority: interpretation.priority,
    description: interpretation.description,
    strengths: [],
    priorities: [],
    recommendations,
  };
}
