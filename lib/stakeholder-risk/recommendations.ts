import type { StakeholderCondition } from "@/types/stakeholder-risk";

import { stakeholderConditions } from "./domains";
import {
  getPriorityLevel,
  type PriorityLevel,
} from "./interpretation";

export type RiskRecommendation = {
  conditionId: string;
  conditionName: string;
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
    title: "Strengthen stakeholder identification and mapping",
    action:
      "Complete and maintain a comprehensive stakeholder map covering all relevant groups, their interests, influence, and relationship responsibilities. Ensure systematic processes for ongoing stakeholder identification.",
  },

  influence_power: {
    title: "Strengthen understanding of stakeholder influence and power dynamics",
    action:
      "Assess and document the relative influence and power of different stakeholder groups. Develop tailored engagement strategies for high-influence stakeholders and monitor potential power shifts.",
  },

  expectations_perceptions: {
    title: "Strengthen management of stakeholder expectations and perceptions",
    action:
      "Identify and document stakeholder expectations, ensure alignment with project capabilities, and communicate clearly to manage perceptions. Address gaps between expectations and realistic deliverables.",
  },

  engagement_relationships: {
    title: "Strengthen stakeholder engagement and relationship management",
    action:
      "Implement structured engagement approaches throughout the project lifecycle, document engagements for follow-up, and ensure engagement methods are appropriate to stakeholder characteristics and needs.",
  },

  grievance_conflict: {
    title: "Strengthen grievance and conflict management",
    action:
      "Establish clear grievance processes, ensure accessibility for different stakeholder groups, track grievances to resolution, and analyze patterns to identify and address systemic issues.",
  },

  benefits_empowerment: {
    title: "Strengthen benefits distribution and empowerment initiatives",
    action:
      "Identify and communicate local economic participation opportunities, monitor outcomes against objectives, address barriers to participation, and ensure benefit distribution is perceived as fair and equitable.",
  },

  institutional_governance: {
    title: "Strengthen institutional alignment and governance",
    action:
      "Identify and engage relevant institutions, understand roles and dependencies, engage at appropriate project stages, and monitor institutional commitments and policy developments.",
  },

  change_disruption: {
    title: "Strengthen management of change and external disruptions",
    action:
      "Assess potential external disruptions, develop contingency plans, monitor external factors, prepare stakeholders for project-related changes, and maintain flexibility to adapt to changing conditions.",
  },
};

function getRecommendationRule(
  condition: StakeholderCondition,
): RecommendationRule {
  const rule = recommendationRules[condition.id];

  if (!rule) {
    throw new Error(
      `No recommendation rule defined for condition: ${condition.id}`,
    );
  }

  return rule;
}

export function getConditionRecommendation(
  conditionId: string,
  score: number,
): RiskRecommendation {
  const condition = stakeholderConditions.find(
    (item) => item.id === conditionId,
  );

  if (!condition) {
    throw new Error(`Unknown stakeholder condition: ${conditionId}`);
  }

  const rule = getRecommendationRule(condition);

  return {
    conditionId: condition.id,
    conditionName: condition.name,
    priority: getPriorityLevel(score, score), // Using same score for both condition and risk for simplicity
    title: rule.title,
    action: rule.action,
  };
}

export function getRiskRecommendations(
  conditionResults: Array<{
    conditionId: string;
    score: number;
  }>,
): RiskRecommendation[] {
  return conditionResults
    .map((result) =>
      getConditionRecommendation(result.conditionId, result.score),
    )
    .sort((a, b) => {
      const priorityOrder: Record<PriorityLevel, number> = {
        "Critical Priority": 0,
        "High Priority": 1,
        "Attention Required": 2,
        Monitor: 3,
        "Low Priority": 4,
      };

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}
