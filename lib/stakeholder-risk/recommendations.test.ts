import {
  getRiskRecommendations,
  getConditionRecommendation,
} from "./recommendations";

function assertEqual<T>(
  actual: T,
  expected: T,
  message: string,
): void {
  if (actual !== expected) {
    throw new Error(
      `${message}: expected "${String(expected)}", received "${String(actual)}"`,
    );
  }

  console.log(`PASS: ${message}`);
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }

  console.log(`PASS: ${message}`);
}

// Individual condition recommendation
const coverageRecommendation = getConditionRecommendation(
  "stakeholder_coverage",
  25,
);

assertEqual(
  coverageRecommendation.priority,
  "Critical Priority",
  "Low stakeholder coverage score produces Critical Priority",
);

assertEqual(
  coverageRecommendation.conditionName,
  "Stakeholder Coverage",
  "Recommendation contains the correct condition",
);

assertEqual(
  coverageRecommendation.title,
  "Strengthen stakeholder identification and mapping",
  "Stakeholder coverage recommendation has the correct title",
);

assert(
  coverageRecommendation.action.length > 0,
  "Stakeholder coverage recommendation contains an action",
);

// Boundary priority
const developingRecommendation = getConditionRecommendation(
  "influence_power",
  35,
);

assertEqual(
  developingRecommendation.priority,
  "High Priority",
  "Score of 35 produces High Priority",
);

// Strong condition
const strongRecommendation = getConditionRecommendation(
  "engagement_relationships",
  88,
);

assertEqual(
  strongRecommendation.priority,
  "Low Priority",
  "Score of 88 produces Low Priority",
);

// All eight conditions must have rules
const conditionIds = [
  "stakeholder_coverage",
  "influence_power",
  "expectations_perceptions",
  "engagement_relationships",
  "grievance_conflict",
  "benefits_empowerment",
  "institutional_governance",
  "change_disruption",
];

for (const conditionId of conditionIds) {
  const recommendation = getConditionRecommendation(conditionId, 50);

  assert(
    recommendation.title.length > 0,
    `${conditionId} has a recommendation title`,
  );

  assert(
    recommendation.action.length > 0,
    `${conditionId} has a recommendation action`,
  );
}

// Recommendation ordering
const recommendations = getRiskRecommendations([
  {
    conditionId: "engagement_relationships",
    score: 75,
  },
  {
    conditionId: "stakeholder_coverage",
    score: 20,
  },
  {
    conditionId: "institutional_governance",
    score: 40,
  },
  {
    conditionId: "influence_power",
    score: 60,
  },
]);

assertEqual(
  recommendations[0].conditionId,
  "stakeholder_coverage",
  "Critical Priority recommendations appear first",
);

assertEqual(
  recommendations[1].conditionId,
  "institutional_governance",
  "High Priority recommendations appear after Critical Priority",
);

assertEqual(
  recommendations[2].conditionId,
  "influence_power",
  "Attention Required recommendations appear after High Priority",
);

assertEqual(
  recommendations[3].conditionId,
  "engagement_relationships",
  "Monitor recommendations appear after Attention Required",
);

// Unknown condition must be rejected
try {
  getConditionRecommendation("unknown_condition", 50);
  throw new Error("Unknown condition was not rejected");
} catch (error) {
  if (
    error instanceof Error &&
    error.message === "Unknown condition was not rejected"
  ) {
    throw error;
  }

  console.log("PASS: Unknown condition is rejected");
}

console.log("");
console.log("All risk recommendation tests passed.");
