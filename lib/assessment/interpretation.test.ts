import {
  getPriorityLevel,
  getReadinessBand,
  getReadinessDescription,
  interpretReadiness,
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

// Readiness-band boundary tests
assertEqual(
  getReadinessBand(0),
  "Foundational gaps",
  "0 is Foundational gaps",
);

assertEqual(
  getReadinessBand(39.9),
  "Foundational gaps",
  "39.9 is Foundational gaps",
);

assertEqual(
  getReadinessBand(40),
  "Developing",
  "40 is Developing",
);

assertEqual(
  getReadinessBand(59.9),
  "Developing",
  "59.9 is Developing",
);

assertEqual(
  getReadinessBand(60),
  "Established but vulnerable",
  "60 is Established but vulnerable",
);

assertEqual(
  getReadinessBand(74.9),
  "Established but vulnerable",
  "74.9 is Established but vulnerable",
);

assertEqual(
  getReadinessBand(75),
  "Strong foundation",
  "75 is Strong foundation",
);

assertEqual(
  getReadinessBand(89.9),
  "Strong foundation",
  "89.9 is Strong foundation",
);

assertEqual(
  getReadinessBand(90),
  "Highly developed",
  "90 is Highly developed",
);

assertEqual(
  getReadinessBand(100),
  "Highly developed",
  "100 is Highly developed",
);

// Priority boundary tests
assertEqual(
  getPriorityLevel(39.9),
  "High Priority",
  "39.9 is High Priority",
);

assertEqual(
  getPriorityLevel(40),
  "Attention Required",
  "40 is Attention Required",
);

assertEqual(
  getPriorityLevel(59.9),
  "Attention Required",
  "59.9 is Attention Required",
);

assertEqual(
  getPriorityLevel(60),
  "Monitor",
  "60 is Monitor",
);

assertEqual(
  getPriorityLevel(74.9),
  "Monitor",
  "74.9 is Monitor",
);

assertEqual(
  getPriorityLevel(75),
  "Established",
  "75 is Established",
);

// Combined interpretation
const interpretation = interpretReadiness(82);

assertEqual(
  interpretation.band,
  "Strong foundation",
  "82 returns the correct readiness band",
);

assertEqual(
  interpretation.priority,
  "Established",
  "82 returns the correct priority",
);

if (!interpretation.description) {
  throw new Error("Expected readiness description to be present");
}

console.log("PASS: Readiness interpretation includes a description");

// Description coverage
const bands = [
  "Foundational gaps",
  "Developing",
  "Established but vulnerable",
  "Strong foundation",
  "Highly developed",
] as const;

for (const band of bands) {
  if (!getReadinessDescription(band)) {
    throw new Error(`Expected description for ${band}`);
  }

  console.log(`PASS: ${band} has an interpretation description`);
}

// Invalid scores
assertThrows(
  () => getReadinessBand(-1),
  "Negative readiness score is rejected",
);

assertThrows(
  () => getReadinessBand(101),
  "Readiness score above 100 is rejected",
);

assertThrows(
  () => getPriorityLevel(-1),
  "Negative priority score is rejected",
);

assertThrows(
  () => getPriorityLevel(101),
  "Priority score above 100 is rejected",
);

console.log("");
console.log("All interpretation tests passed.");