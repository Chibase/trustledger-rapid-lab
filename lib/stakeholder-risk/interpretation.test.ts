import {
  getConditionBand,
  getRiskBand,
  getPriorityLevel,
  getRiskDescription,
  interpretRisk,
} from "./interpretation";

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(
      `${message}: expected "${String(expected)}", received "${String(actual)}"`,
    );
  }

  console.log(`PASS: ${message}`);
}

function assertThrows(
  callback: () => unknown,
  message: string,
): void {
  try {
    callback();
    throw new Error(`${message}: expected function to throw`);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === `${message}: expected function to throw`
    ) {
      throw error;
    }

    console.log(`PASS: ${message}`);
  }
}

// Condition-band boundary tests
assertEqual(
  getConditionBand(0),
  "Critical conditions",
  "0 is Critical conditions",
);

assertEqual(
  getConditionBand(29.9),
  "Critical conditions",
  "29.9 is Critical conditions",
);

assertEqual(
  getConditionBand(30),
  "Poor conditions",
  "30 is Poor conditions",
);

assertEqual(
  getConditionBand(49.9),
  "Poor conditions",
  "49.9 is Poor conditions",
);

assertEqual(
  getConditionBand(50),
  "Developing conditions",
  "50 is Developing conditions",
);

assertEqual(
  getConditionBand(69.9),
  "Developing conditions",
  "69.9 is Developing conditions",
);

assertEqual(
  getConditionBand(70),
  "Adequate conditions",
  "70 is Adequate conditions",
);

assertEqual(
  getConditionBand(84.9),
  "Adequate conditions",
  "84.9 is Adequate conditions",
);

assertEqual(
  getConditionBand(85),
  "Strong conditions",
  "85 is Strong conditions",
);

assertEqual(
  getConditionBand(100),
  "Strong conditions",
  "100 is Strong conditions",
);

// Risk-band boundary tests
assertEqual(
  getRiskBand(0),
  "Critical risk exposure",
  "0 is Critical risk exposure",
);

assertEqual(
  getRiskBand(29.9),
  "Critical risk exposure",
  "29.9 is Critical risk exposure",
);

assertEqual(
  getRiskBand(30),
  "High risk exposure",
  "30 is High risk exposure",
);

assertEqual(
  getRiskBand(49.9),
  "High risk exposure",
  "49.9 is High risk exposure",
);

assertEqual(
  getRiskBand(50),
  "Moderate risk exposure",
  "50 is Moderate risk exposure",
);

assertEqual(
  getRiskBand(69.9),
  "Moderate risk exposure",
  "69.9 is Moderate risk exposure",
);

assertEqual(
  getRiskBand(70),
  "Low risk exposure",
  "70 is Low risk exposure",
);

assertEqual(
  getRiskBand(84.9),
  "Low risk exposure",
  "84.9 is Low risk exposure",
);

assertEqual(
  getRiskBand(85),
  "Minimal risk exposure",
  "85 is Minimal risk exposure",
);

assertEqual(
  getRiskBand(100),
  "Minimal risk exposure",
  "100 is Minimal risk exposure",
);

// Priority boundary tests (based on average of condition and risk scores)
assertEqual(
  getPriorityLevel(25, 25),
  "Critical Priority",
  "Average of 25, 25 is Critical Priority",
);

assertEqual(
  getPriorityLevel(35, 35),
  "High Priority",
  "Average of 35, 35 is High Priority",
);

assertEqual(
  getPriorityLevel(55, 55),
  "Attention Required",
  "Average of 55, 55 is Attention Required",
);

assertEqual(
  getPriorityLevel(75, 75),
  "Monitor",
  "Average of 75, 75 is Monitor",
);

assertEqual(
  getPriorityLevel(90, 90),
  "Low Priority",
  "Average of 90, 90 is Low Priority",
);

// Combined interpretation
const interpretation = interpretRisk(55, 60);

assertEqual(
  interpretation.conditionBand,
  "Developing conditions",
  "55 returns the correct condition band",
);

assertEqual(
  interpretation.riskBand,
  "Moderate risk exposure",
  "60 returns the correct risk band",
);

assertEqual(
  interpretation.priority,
  "Attention Required",
  "Average of 55, 60 returns the correct priority",
);

if (!interpretation.description) {
  throw new Error("Expected risk description to be present");
}

console.log("PASS: Risk interpretation includes a description");

// Description coverage
const conditionBands = [
  "Critical conditions",
  "Poor conditions",
  "Developing conditions",
  "Adequate conditions",
  "Strong conditions",
] as const;

for (const band of conditionBands) {
  const riskBand = "Moderate risk exposure";
  if (!getRiskDescription(band, riskBand)) {
    throw new Error(`Expected description for ${band}`);
  }

  console.log(`PASS: ${band} has an interpretation description`);
}

// Invalid scores
assertThrows(
  () => getConditionBand(-1),
  "Negative condition score is rejected",
);

assertThrows(
  () => getConditionBand(101),
  "Condition score above 100 is rejected",
);

assertThrows(
  () => getRiskBand(-1),
  "Negative risk score is rejected",
);

assertThrows(
  () => getRiskBand(101),
  "Risk score above 100 is rejected",
);

console.log("");
console.log("All risk interpretation tests passed.");
