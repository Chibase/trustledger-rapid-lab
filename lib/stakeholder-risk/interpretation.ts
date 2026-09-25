export type ConditionBand =
  | "Critical conditions"
  | "Poor conditions"
  | "Developing conditions"
  | "Adequate conditions"
  | "Strong conditions";

export type RiskBand =
  | "Critical risk exposure"
  | "High risk exposure"
  | "Moderate risk exposure"
  | "Low risk exposure"
  | "Minimal risk exposure";

export type PriorityLevel =
  | "Critical Priority"
  | "High Priority"
  | "Attention Required"
  | "Monitor"
  | "Low Priority";

export type RiskInterpretation = {
  conditionBand: ConditionBand;
  riskBand: RiskBand;
  priority: PriorityLevel;
  description: string;
};

export function getConditionBand(score: number): ConditionBand {
  if (score < 0 || score > 100) {
    throw new Error(`Score must be between 0 and 100. Received: ${score}`);
  }

  if (score < 30) {
    return "Critical conditions";
  }

  if (score < 50) {
    return "Poor conditions";
  }

  if (score < 70) {
    return "Developing conditions";
  }

  if (score < 85) {
    return "Adequate conditions";
  }

  return "Strong conditions";
}

export function getRiskBand(score: number): RiskBand {
  if (score < 0 || score > 100) {
    throw new Error(`Score must be between 0 and 100. Received: ${score}`);
  }

  if (score < 30) {
    return "Critical risk exposure";
  }

  if (score < 50) {
    return "High risk exposure";
  }

  if (score < 70) {
    return "Moderate risk exposure";
  }

  if (score < 85) {
    return "Low risk exposure";
  }

  return "Minimal risk exposure";
}

export function getPriorityLevel(
  conditionScore: number,
  riskScore: number,
): PriorityLevel {
  const avgScore = (conditionScore + riskScore) / 2;

  if (avgScore < 30) {
    return "Critical Priority";
  }

  if (avgScore < 50) {
    return "High Priority";
  }

  if (avgScore < 70) {
    return "Attention Required";
  }

  if (avgScore < 85) {
    return "Monitor";
  }

  return "Low Priority";
}

export function getRiskDescription(
  conditionBand: ConditionBand,
  riskBand: RiskBand,
): string {
  const conditionDescriptions: Record<ConditionBand, string> = {
    "Critical conditions": "Stakeholder conditions are critically weak across multiple areas, indicating fundamental gaps in stakeholder management.",
    "Poor conditions": "Stakeholder conditions are poor in several areas, suggesting significant weaknesses in stakeholder relationship management.",
    "Developing conditions": "Stakeholder conditions are developing but show important gaps that should be addressed to strengthen stakeholder relationships.",
    "Adequate conditions": "Stakeholder conditions are generally adequate with some areas that could be strengthened for better stakeholder management.",
    "Strong conditions": "Stakeholder conditions are strong across most assessed areas, indicating effective stakeholder relationship management.",
  };

  const riskDescriptions: Record<RiskBand, string> = {
    "Critical risk exposure": "Risk exposure is critical across multiple risk lenses, requiring immediate and comprehensive risk mitigation.",
    "High risk exposure": "Risk exposure is high across several risk lenses, indicating significant stakeholder-related risks that need attention.",
    "Moderate risk exposure": "Risk exposure is moderate with some areas requiring attention to prevent escalation into more significant risks.",
    "Low risk exposure": "Risk exposure is generally low with isolated areas that may benefit from monitoring or minor mitigation.",
    "Minimal risk exposure": "Risk exposure is minimal across assessed risk lenses, indicating effective risk management practices.",
  };

  return `${conditionDescriptions[conditionBand]} ${riskDescriptions[riskBand]}`;
}

export function interpretRisk(
  conditionScore: number,
  riskScore: number,
): RiskInterpretation {
  const conditionBand = getConditionBand(conditionScore);
  const riskBand = getRiskBand(riskScore);
  const priority = getPriorityLevel(conditionScore, riskScore);

  return {
    conditionBand,
    riskBand,
    priority,
    description: getRiskDescription(conditionBand, riskBand),
  };
}
