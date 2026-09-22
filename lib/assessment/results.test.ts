import type { AssessmentResponse } from "@/types/assessment";

import { assessmentDimensions } from "./dimensions";
import { buildAssessmentResult } from "./results";

const allFourResponses: AssessmentResponse[] =
  assessmentDimensions.flatMap((dimension) =>
    dimension.questionIds.map((questionId) => ({
      questionId,
      value: 4 as const,
    })),
  );

const result = buildAssessmentResult(allFourResponses);

if (result.overallScore !== 100) {
  throw new Error(
    `Expected overall score of 100, received ${result.overallScore}`,
  );
}

if (result.band !== "Highly developed") {
  throw new Error(
    `Expected "Highly developed", received "${result.band}"`,
  );
}

if (result.priority !== "Established") {
  throw new Error(
    `Expected "Established", received "${result.priority}"`,
  );
}

if (result.dimensionResults.length !== 8) {
  throw new Error(
    `Expected 8 dimension results, received ${result.dimensionResults.length}`,
  );
}

if (result.recommendations.length !== 8) {
  throw new Error(
    `Expected 8 recommendations, received ${result.recommendations.length}`,
  );
}

if (result.description.length === 0) {
  throw new Error("Expected a readiness description");
}

console.log("PASS: Complete assessment result assembled correctly");
console.log("PASS: Overall score is 100");
console.log("PASS: Readiness band is Highly developed");
console.log("PASS: Priority is Established");
console.log("PASS: 8 dimension results returned");
console.log("PASS: 8 recommendations returned");
console.log("PASS: Readiness description returned");

console.log("\nAll result assembly tests passed.");