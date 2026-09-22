

import type { AssessmentResponse } from "@/types/assessment";

import {
  calculateDimensionScore,
  calculateOverallScore,
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
): AssessmentResponse[] {
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

const allFourResult = calculateDimensionScore(
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

const allZeroResult = calculateDimensionScore(
  "stakeholder_coverage",
  allZeroResponses,
);

assertEqual(allZeroResult.score, 0, "All 0s produce 0%");

// ------------------------------------------------------------
// Test 3: 4 + 3 + 3 + 2 + 4 = 80%
// ------------------------------------------------------------

const mixedResponses: AssessmentResponse[] = [
  { questionId: "sc-01", value: 4 },
  { questionId: "sc-02", value: 3 },
  { questionId: "sc-03", value: 3 },
  { questionId: "sc-04", value: 2 },
  { questionId: "sc-05", value: 4 },
];

const mixedResult = calculateDimensionScore(
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

const notApplicableResponses: AssessmentResponse[] = [
  { questionId: "sc-01", value: 4 },
  { questionId: "sc-02", value: 4 },
  { questionId: "sc-03", value: 4 },
  { questionId: "sc-04", value: 4 },
  { questionId: "sc-05", notApplicable: true },
];

const notApplicableResult = calculateDimensionScore(
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

const incompleteResponses: AssessmentResponse[] = [
  { questionId: "sc-01", value: 4 },
  { questionId: "sc-02", value: 4 },
  { questionId: "sc-03", value: 4 },
  { questionId: "sc-04", value: 4 },
];

assertThrows(
  () =>
    calculateDimensionScore(
      "stakeholder_coverage",
      incompleteResponses,
    ),
  "Incomplete assessment is rejected",
);

// ------------------------------------------------------------
// Test 6: Overall score averages applicable dimensions
//
// Dimension 1 = 100
// Dimension 2 = 50
// Overall = 75
// ------------------------------------------------------------

const overallResult = calculateOverallScore([
  {
    dimensionId: "stakeholder_coverage",
    score: 100,
    applicableQuestions: 5,
    answeredQuestions: 5,
  },
  {
    dimensionId: "community_participation",
    score: 50,
    applicableQuestions: 5,
    answeredQuestions: 5,
  },
]);

assertEqual(
  overallResult,
  75,
  "Overall score averages dimension scores",
);

console.log("");
console.log("All scoring tests passed.");