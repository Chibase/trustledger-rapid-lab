import {
  getAssessmentRecommendations,
  getDimensionRecommendation,
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

// Individual dimension recommendation
const stakeholderRecommendation = getDimensionRecommendation(
  "stakeholder_coverage",
  32,
);

assertEqual(
  stakeholderRecommendation.priority,
  "High Priority",
  "Low stakeholder coverage score produces High Priority",
);

assertEqual(
  stakeholderRecommendation.dimensionName,
  "Stakeholder Coverage",
  "Recommendation contains the correct dimension",
);

assertEqual(
  stakeholderRecommendation.title,
  "Strengthen stakeholder mapping and responsibility",
  "Stakeholder recommendation has the correct title",
);

assert(
  stakeholderRecommendation.action.length > 0,
  "Stakeholder recommendation contains an action",
);

// Boundary priority
const developingRecommendation = getDimensionRecommendation(
  "community_participation",
  40,
);

assertEqual(
  developingRecommendation.priority,
  "Attention Required",
  "Score of 40 produces Attention Required",
);

// Established dimension
const establishedRecommendation = getDimensionRecommendation(
  "engagement_quality",
  82,
);

assertEqual(
  establishedRecommendation.priority,
  "Established",
  "Score of 82 produces Established",
);

// All eight dimensions must have rules
const dimensionIds = [
  "stakeholder_coverage",
  "community_participation",
  "engagement_quality",
  "grievance_readiness",
  "transparency_commitments",
  "economic_empowerment",
  "institutional_alignment",
  "social_risk_readiness",
];

for (const dimensionId of dimensionIds) {
  const recommendation = getDimensionRecommendation(dimensionId, 50);

  assert(
    recommendation.title.length > 0,
    `${dimensionId} has a recommendation title`,
  );

  assert(
    recommendation.action.length > 0,
    `${dimensionId} has a recommendation action`,
  );
}

// Recommendation ordering
const recommendations = getAssessmentRecommendations([
  {
    dimensionId: "engagement_quality",
    score: 80,
  },
  {
    dimensionId: "stakeholder_coverage",
    score: 25,
  },
  {
    dimensionId: "grievance_readiness",
    score: 45,
  },
  {
    dimensionId: "community_participation",
    score: 65,
  },
]);

assertEqual(
  recommendations[0].dimensionId,
  "stakeholder_coverage",
  "High Priority recommendations appear first",
);

assertEqual(
  recommendations[1].dimensionId,
  "grievance_readiness",
  "Attention Required recommendations appear after High Priority",
);

assertEqual(
  recommendations[2].dimensionId,
  "community_participation",
  "Monitor recommendations appear after Attention Required",
);

assertEqual(
  recommendations[3].dimensionId,
  "engagement_quality",
  "Established recommendations appear last",
);

// Unknown dimension must be rejected
try {
  getDimensionRecommendation("unknown_dimension", 50);
  throw new Error("Unknown dimension was not rejected");
} catch (error) {
  if (
    error instanceof Error &&
    error.message === "Unknown dimension was not rejected"
  ) {
    throw error;
  }

  console.log("PASS: Unknown dimension is rejected");
}

console.log("");
console.log("All recommendation tests passed.");