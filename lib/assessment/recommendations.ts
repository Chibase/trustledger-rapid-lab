import type { AssessmentDimension } from "@/types/assessment";

import { assessmentDimensions } from "./dimensions";
import {
  getPriorityLevel,
  type PriorityLevel,
} from "./interpretation";

export type AssessmentRecommendation = {
  dimensionId: string;
  dimensionName: string;
  priority: PriorityLevel;
  title: string;
  action: string;
};

type RecommendationRule = {
  title: string;
  action: string;
};

const recommendationRules: Record<string, RecommendationRule> = {
  stakeholder_coverage: {
    title: "Strengthen stakeholder mapping and responsibility",
    action:
      "Complete and maintain a stakeholder map covering affected groups, vulnerable stakeholders, interests, influence and clearly assigned relationship responsibilities.",
  },

  community_participation: {
    title: "Strengthen meaningful community participation",
    action:
      "Review whether affected communities receive timely information, meaningful opportunities to contribute, appropriate participation methods and clear feedback on how their input is addressed.",
  },

  engagement_quality: {
    title: "Improve engagement planning and follow-through",
    action:
      "Establish a consistent engagement process with documented engagements, lifecycle coverage, tracked commitments and regular reporting of stakeholder issues to management.",
  },

  grievance_readiness: {
    title: "Strengthen grievance readiness",
    action:
      "Ensure accessible grievance channels, defined responsibilities and response timeframes, consistent case tracking, resolution monitoring and analysis of recurring concerns.",
  },

  transparency_commitments: {
    title: "Strengthen commitment tracking and transparency",
    action:
      "Create a reliable register of significant stakeholder commitments with responsible owners, deadlines, progress monitoring and appropriate communication of material changes.",
  },

  economic_empowerment: {
    title: "Strengthen local economic and empowerment alignment",
    action:
      "Identify realistic local participation opportunities, define measurable objectives, communicate opportunities transparently and monitor outcomes against commitments and identified barriers.",
  },

  institutional_alignment: {
    title: "Strengthen institutional coordination",
    action:
      "Map relevant government, municipal, regulatory and institutional stakeholders, clarify dependencies and responsibilities, and actively monitor outstanding institutional actions and changes.",
  },

  social_risk_readiness: {
    title: "Strengthen social risk identification and response",
    action:
      "Maintain a documented social-risk view with warning indicators, assigned owners, escalation arrangements and a process for incorporating lessons from stakeholder issues and grievances.",
  },
};

function getRecommendationRule(
  dimension: AssessmentDimension,
): RecommendationRule {
  const rule = recommendationRules[dimension.id];

  if (!rule) {
    throw new Error(
      `No recommendation rule defined for dimension: ${dimension.id}`,
    );
  }

  return rule;
}

export function getDimensionRecommendation(
  dimensionId: string,
  score: number,
): AssessmentRecommendation {
  const dimension = assessmentDimensions.find(
    (item) => item.id === dimensionId,
  );

  if (!dimension) {
    throw new Error(`Unknown assessment dimension: ${dimensionId}`);
  }

  const rule = getRecommendationRule(dimension);

  return {
    dimensionId: dimension.id,
    dimensionName: dimension.name,
    priority: getPriorityLevel(score),
    title: rule.title,
    action: rule.action,
  };
}

export function getAssessmentRecommendations(
  dimensionResults: Array<{
    dimensionId: string;
    score: number;
  }>,
): AssessmentRecommendation[] {
  return dimensionResults
    .map((result) =>
      getDimensionRecommendation(result.dimensionId, result.score),
    )
    .sort((a, b) => {
      const priorityOrder: Record<PriorityLevel, number> = {
        "High Priority": 0,
        "Attention Required": 1,
        Monitor: 2,
        Established: 3,
      };

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}