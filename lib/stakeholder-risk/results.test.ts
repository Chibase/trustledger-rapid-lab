import type { RiskResponse } from "@/types/stakeholder-risk";

import { stakeholderConditions } from "./domains";
import { buildRiskResult } from "./results";

const allFourResponses: RiskResponse[] =
  stakeholderConditions.flatMap((condition) =>
    condition.questionIds.map((questionId) => ({
      questionId,
      value: 4 as const,
    })),
  );

const result = buildRiskResult(allFourResponses);

if (result.overallConditionScore !== 100) {
  throw new Error(
    `Expected overall condition score of 100, received ${result.overallConditionScore}`,
  );
}

if (result.overallRiskExposure !== 100) {
  throw new Error(
    `Expected overall risk exposure of 100, received ${result.overallRiskExposure}`,
  );
}

if (result.conditionBand !== "Strong conditions") {
  throw new Error(
    `Expected "Strong conditions", received "${result.conditionBand}"`,
  );
}

if (result.riskBand !== "Minimal risk exposure") {
  throw new Error(
    `Expected "Minimal risk exposure", received "${result.riskBand}"`,
  );
}

if (result.priority !== "Low Priority") {
  throw new Error(
    `Expected "Low Priority", received "${result.priority}"`,
  );
}

if (result.conditionResults.length !== 8) {
  throw new Error(
    `Expected 8 condition results, received ${result.conditionResults.length}`,
  );
}

if (result.riskLensResults.length === 0) {
  throw new Error(
    `Expected risk lens results, received ${result.riskLensResults.length}`,
  );
}

if (result.recommendations.length !== 8) {
  throw new Error(
    `Expected 8 recommendations, received ${result.recommendations.length}`,
  );
}

if (result.description.length === 0) {
  throw new Error("Expected a risk description");
}

console.log("PASS: Complete risk result assembled correctly");
console.log("PASS: Overall condition score is 100");
console.log("PASS: Overall risk exposure is 100");
console.log("PASS: Condition band is Strong conditions");
console.log("PASS: Risk band is Minimal risk exposure");
console.log("PASS: Priority is Low Priority");
console.log("PASS: 8 condition results returned");
console.log(`PASS: ${result.riskLensResults.length} risk lens results returned`);
console.log("PASS: 8 recommendations returned");
console.log("PASS: Risk description returned");

console.log("\nAll risk result assembly tests passed.");
