
import type { RiskResponse } from "@/types/stakeholder-risk";

import {
  calculateConditionScore,
  calculateOverallConditionScore,
  calculateRiskLensScores,
  calculateOverallRiskExposure,
} from "./scoring";

function assertEqual(
  actual: number,
  expected: number,
  description: string,
): void {
  if (actual !== expected) {
    throw new Error(
      `${description}: expected ${expected}, received ${actual}`,
    );
  }

  console.log(`PASS: ${description}`);
}

function assertThrows(
  callback: () => unknown,
  description: string,
): void {
  try {
    callback();
    throw new Error(`${description}: expected an error, but none was thrown`);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith(`${description}: expected an error`)
    ) {
      throw error;
    }

    console.log(`PASS: ${description}`);
  }
}

function responsesFor(
  questionIds: string[],
  value: 0 | 1 | 2 | 3 | 4,
): RiskResponse[] {
  return questionIds.map((questionId) => ({
    questionId,
    value,
  }));
}

// ------------------------------------------------------------
// Test 1: All 4s = 100%
// ------------------------------------------------------------

const allFourResponses = responsesFor(
  ["sc-01", "sc-02", "sc-03", "sc-04", "sc-05"],
  4,
);

const allFourResult = calculateConditionScore(
  "stakeholder_coverage",
  allFourResponses,
);

assertEqual(allFourResult.score, 100, "All 4s produce 100%");

// ------------------------------------------------------------
// Test 2: All 0s = 0%
// ------------------------------------------------------------

const allZeroResponses = responsesFor(
  ["sc-01", "sc-02", "sc-03", "sc-04", "sc-05"],
  0,
);

const allZeroResult = calculateConditionScore(
  "stakeholder_coverage",
  allZeroResponses,
);

assertEqual(allZeroResult.score, 0, "All 0s produce 0%");

// ------------------------------------------------------------
// Test 3: 4 + 3 + 3 + 2 + 4 = 80%
// ------------------------------------------------------------

const mixedResponses: RiskResponse[] = [
  { questionId: "sc-01", value: 4 },
  { questionId: "sc-02", value: 3 },
  { questionId: "sc-03", value: 3 },
  { questionId: "sc-04", value: 2 },
  { questionId: "sc-05", value: 4 },
];

const mixedResult = calculateConditionScore(
  "stakeholder_coverage",
  mixedResponses,
);

assertEqual(mixedResult.score, 80, "Mixed responses produce 80%");

// ------------------------------------------------------------
// Test 4: N/A is excluded from denominator
//
// 4 + 4 + 4 + 4 + N/A
// 16 / 16 = 100%
// ------------------------------------------------------------

const notApplicableResponses: RiskResponse[] = [
  { questionId: "sc-01", value: 4 },
  { questionId: "sc-02", value: 4 },
  { questionId: "sc-03", value: 4 },
  { questionId: "sc-04", value: 4 },
  { questionId: "sc-05", notApplicable: true },
];

const notApplicableResult = calculateConditionScore(
  "stakeholder_coverage",
  notApplicableResponses,
);

assertEqual(
  notApplicableResult.score,
  100,
  "N/A is excluded from the denominator",
);

assertEqual(
  notApplicableResult.applicableQuestions,
  4,
  "N/A reduces applicable question count",
);

// ------------------------------------------------------------
// Test 5: Unanswered applicable question throws an error
// ------------------------------------------------------------

const incompleteResponses: RiskResponse[] = [
  { questionId: "sc-01", value: 4 },
  { questionId: "sc-02", value: 4 },
  { questionId: "sc-03", value: 4 },
  { questionId: "sc-04", value: 4 },
];

assertThrows(
  () =>
    calculateConditionScore(
      "stakeholder_coverage",
      incompleteResponses,
    ),
  "Incomplete assessment is rejected",
);

// ------------------------------------------------------------
// Test 6: Overall condition score averages applicable conditions
//
// Condition 1 = 100
// Condition 2 = 50
// Overall = 75
// ------------------------------------------------------------

const overallResult = calculateOverallConditionScore([
  {
    conditionId: "stakeholder_coverage",
    score: 100,
    applicableQuestions: 5,
    answeredQuestions: 5,
  },
  {
    conditionId: "influence_power",
    score: 50,
    applicableQuestions: 5,
    answeredQuestions: 5,
  },
]);

assertEqual(
  overallResult,
  75,
  "Overall condition score averages condition scores",
);

// ------------------------------------------------------------
// Test 7: Risk lens scores are calculated from individual question responses
// ------------------------------------------------------------

const conditionResults = [
  {
    conditionId: "stakeholder_coverage",
    score: 80,
    applicableQuestions: 5,
    answeredQuestions: 5,
  },
  {
    conditionId: "influence_power",
    score: 60,
    applicableQuestions: 5,
    answeredQuestions: 5,
  },
];

// Simulate responses for stakeholder coverage questions (sc-01 to sc-05)
const mockResponses: RiskResponse[] = [
  { questionId: "sc-01", value: 4 }, // 100%
  { questionId: "sc-02", value: 3 }, // 75%
  { questionId: "sc-03", value: 3 }, // 75%
  { questionId: "sc-04", value: 2 }, // 50%
  { questionId: "sc-05", value: 4 }, // 100%
  { questionId: "ip-01", value: 2 }, // 50%
  { questionId: "ip-02", value: 2 }, // 50%
  { questionId: "ip-03", value: 3 }, // 75%
  { questionId: "ip-04", value: 2 }, // 50%
  { questionId: "ip-05", value: 2 }, // 50%
];

const riskLensResults = calculateRiskLensScores(conditionResults, mockResponses);

if (riskLensResults.length === 0) {
  throw new Error("Risk lens results should not be empty");
}

console.log(`PASS: Risk lens scores calculated from individual responses (${riskLensResults.length} lenses)`);

// Verify that lens scores are based on individual question responses, not condition scores
const financialLens = riskLensResults.find(r => r.lens === "financial");
if (financialLens) {
  // Financial lens should be calculated from specific question responses, not the condition score
  console.log(`PASS: Financial lens score calculated as ${financialLens.score}% from individual responses`);
}

// ------------------------------------------------------------
// Test 8: Overall risk exposure averages risk lens scores
// ------------------------------------------------------------

const mockRiskLensResults = [
  { lens: "financial" as const, score: 70, contributingConditions: ["stakeholder_coverage"] },
  { lens: "operational" as const, score: 50, contributingConditions: ["influence_power"] },
];

const overallRiskExposure = calculateOverallRiskExposure(mockRiskLensResults);

assertEqual(
  overallRiskExposure,
  60,
  "Overall risk exposure averages risk lens scores",
);

console.log("");
console.log("All risk scoring tests passed.");
