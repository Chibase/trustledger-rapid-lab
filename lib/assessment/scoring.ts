import type {
  ResponseValue,
  InterpretationBand,
  DimensionResult,
  AssessmentResult,
  Recommendation,
} from "./types";
import { DIMENSIONS, getQuestionsForDimension } from "./dimensions";
import { QUESTIONS } from "./questions";
import { RECOMMENDATION_LIBRARY } from "./recommendations";

export const INTERPRETATION_BANDS: InterpretationBand[] = [
  {
    label: "Preliminary",
    min: 0,
    max: 24,
    description:
      "Social licence is not yet established. Significant foundational work is required across most dimensions.",
    color: "#dc2626",
  },
  {
    label: "Emerging",
    min: 25,
    max: 49,
    description:
      "Early signs of social licence are present, but substantial gaps remain. Focused effort is needed to build credibility.",
    color: "#ea580c",
  },
  {
    label: "Developing",
    min: 50,
    max: 69,
    description:
      "A moderate social licence foundation exists. Key areas need strengthening to achieve resilience.",
    color: "#ca8a04",
  },
  {
    label: "Established",
    min: 70,
    max: 84,
    description:
      "A strong social licence foundation is in place. Continuous improvement and monitoring will sustain it.",
    color: "#16a34a",
  },
  {
    label: "Leading",
    min: 85,
    max: 100,
    description:
      "Exemplary social licence practice. The project can serve as a model; maintain practices and share lessons.",
    color: "#15803d",
  },
];

export function getBand(score: number): InterpretationBand {
  for (const band of INTERPRETATION_BANDS) {
    if (score >= band.min && score <= band.max) {
      return band;
    }
  }
  return INTERPRETATION_BANDS[0];
}

export const PRIORITY_THRESHOLD = 50;
export const STRENGTH_THRESHOLD = 70;

export function isNA(value: ResponseValue): boolean {
  return value === "NA";
}

export function isApplicableResponse(value: ResponseValue): boolean {
  return !isNA(value);
}

export function getNumericValue(value: ResponseValue): number {
  if (isNA(value)) return 0;
  return value as number;
}

export interface DimensionScoreBreakdown {
  dimensionId: string;
  actualPoints: number;
  maxApplicablePoints: number;
  applicableQuestions: number;
  naQuestions: number;
  totalQuestions: number;
  score: number;
  isApplicable: boolean;
}

export function scoreDimension(
  dimensionId: string,
  responses: Record<string, ResponseValue>,
): DimensionScoreBreakdown {
  const dimensionQuestions = getQuestionsForDimension(dimensionId, QUESTIONS);
  let actualPoints = 0;
  let maxApplicablePoints = 0;
  let applicableQuestions = 0;
  let naQuestions = 0;

  for (const question of dimensionQuestions) {
    const value = responses[question.id];
    if (value === undefined || isNA(value)) {
      naQuestions++;
    } else {
      applicableQuestions++;
      const numeric = getNumericValue(value);
      actualPoints += numeric;
      maxApplicablePoints += 4;
    }
  }

  const isApplicable = applicableQuestions > 0;
  const score =
    isApplicable && maxApplicablePoints > 0
      ? Math.round((actualPoints / maxApplicablePoints) * 100)
      : 0;

  return {
    dimensionId,
    actualPoints,
    maxApplicablePoints,
    applicableQuestions,
    naQuestions,
    totalQuestions: dimensionQuestions.length,
    score,
    isApplicable,
  };
}

export function computeDimensionResults(
  responses: Record<string, ResponseValue>,
): DimensionResult[] {
  return DIMENSIONS.map((dim) => {
    const breakdown = scoreDimension(dim.id, responses);
    const band = breakdown.isApplicable
      ? getBand(breakdown.score)
      : {
          label: "Not Applicable",
          min: 0,
          max: 0,
          description:
            "All questions in this dimension were marked Not Applicable.",
          color: "#6b7280",
        };

    return {
      dimensionId: dim.id,
      dimensionName: dim.name,
      dimensionShortName: dim.shortName,
      score: breakdown.score,
      applicableQuestions: breakdown.applicableQuestions,
      naQuestions: breakdown.naQuestions,
      actualPoints: breakdown.actualPoints,
      maxApplicablePoints: breakdown.maxApplicablePoints,
      band,
      isPriority: breakdown.isApplicable && breakdown.score < PRIORITY_THRESHOLD,
      isStrength: breakdown.isApplicable && breakdown.score >= STRENGTH_THRESHOLD,
      isApplicable: breakdown.isApplicable,
    };
  });
}

export function computeOverallReadiness(
  dimensionResults: DimensionResult[],
): number {
  const applicable = dimensionResults.filter((d) => d.isApplicable);
  if (applicable.length === 0) return 0;
  const sum = applicable.reduce((total, d) => total + d.score, 0);
  return Math.round(sum / applicable.length);
}

export function computeSystemicConsiderations(
  dimensionResults: DimensionResult[],
): string[] {
  const considerations: string[] = [];

  const totalNA = dimensionResults.reduce(
    (sum, d) => sum + d.naQuestions,
    0,
  );
  const totalQuestions = dimensionResults.reduce(
    (sum, d) => sum + d.applicableQuestions + d.naQuestions,
    0,
  );
  if (totalQuestions > 0 && totalNA / totalQuestions > 0.25) {
    considerations.push(
      "A high proportion of questions were marked Not Applicable. This may indicate that the social licence framework is narrowly scoped, or that the project is at an early stage where many practices have not yet been initiated. Consider whether N/A responses reflect genuine inapplicability or gaps in implementation.",
    );
  }

  const engagementDims = dimensionResults.filter((d) =>
    ["community-participation", "engagement-quality"].includes(d.dimensionId),
  );
  const lowEngagement = engagementDims.filter(
    (d) => d.isApplicable && d.score < PRIORITY_THRESHOLD,
  );
  if (lowEngagement.length >= 2) {
    considerations.push(
      "Multiple engagement-related dimensions score below the priority threshold. This pattern suggests a risk to community trust and may indicate that engagement is treated as compliance rather than relationship-building.",
    );
  }

  const riskDims = dimensionResults.filter((d) =>
    ["grievance-readiness", "social-risk-readiness"].includes(d.dimensionId),
  );
  const lowRisk = riskDims.filter(
    (d) => d.isApplicable && d.score < PRIORITY_THRESHOLD,
  );
  if (lowRisk.length >= 2) {
    considerations.push(
      "Both grievance readiness and social risk readiness score in the priority range. This indicates a reactive rather than proactive posture — the project may struggle to identify and address emerging social issues before they escalate.",
    );
  }

  const transparencyDims = dimensionResults.filter((d) =>
    d.dimensionId === "transparency-commitments",
  );
  if (
    transparencyDims.length > 0 &&
    transparencyDims[0].isApplicable &&
    transparencyDims[0].score < PRIORITY_THRESHOLD
  ) {
    considerations.push(
      "Low transparency and commitments scores undermine stakeholder confidence. Without visible disclosure and commitment tracking, other social licence efforts may be perceived as performative.",
    );
  }

  const allHigh = dimensionResults
    .filter((d) => d.isApplicable)
    .every((d) => d.score >= STRENGTH_THRESHOLD);
  if (allHigh && dimensionResults.filter((d) => d.isApplicable).length >= 6) {
    considerations.push(
      "All applicable dimensions score at or above the strength threshold. While this is a strong result, verify that scores reflect lived stakeholder experience rather than self-assessment optimism. Independent verification is recommended.",
    );
  }

  if (considerations.length === 0) {
    considerations.push(
      "No systemic patterns were identified across dimensions. Continue monitoring individual dimension scores and revisit systemic considerations as the project evolves.",
    );
  }

  return considerations;
}

export function computeRecommendedActions(
  dimensionResults: DimensionResult[],
): Recommendation[] {
  const actions: Recommendation[] = [];

  const priorityAreas = dimensionResults
    .filter((d) => d.isPriority)
    .sort((a, b) => a.score - b.score);

  for (const area of priorityAreas) {
    const recs = RECOMMENDATION_LIBRARY[area.dimensionId];
    if (recs) {
      for (const rec of recs) {
        actions.push({
          dimensionId: area.dimensionId,
          dimensionName: area.dimensionName,
          priority: area.score < 25 ? "high" : "medium",
          action: rec,
        });
      }
    }
  }

  return actions;
}

export function computeAssessmentResult(
  responses: Record<string, ResponseValue>,
): AssessmentResult {
  const dimensionResults = computeDimensionResults(responses);
  const overallReadiness = computeOverallReadiness(dimensionResults);
  const band = getBand(overallReadiness);

  const strengths = dimensionResults
    .filter((d) => d.isStrength)
    .sort((a, b) => b.score - a.score);

  const priorityAreas = dimensionResults
    .filter((d) => d.isPriority)
    .sort((a, b) => a.score - b.score);

  const systemicConsiderations =
    computeSystemicConsiderations(dimensionResults);
  const recommendedActions = computeRecommendedActions(dimensionResults);

  return {
    overallReadiness,
    band,
    dimensionResults,
    strengths,
    priorityAreas,
    systemicConsiderations,
    recommendedActions,
  };
}
