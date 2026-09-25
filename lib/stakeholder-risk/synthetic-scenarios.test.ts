import { getAllScenarios, getScenarioByName } from "./synthetic-scenarios";

function assertEqual<T>(actual: T, expected: T, message: string): void {
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

// Test scenario retrieval
const scenarios = getAllScenarios();

assert(scenarios.scenarioA !== undefined, "Scenario A exists");
assert(scenarios.scenarioB !== undefined, "Scenario B exists");
assert(scenarios.scenarioC !== undefined, "Scenario C exists");
assert(scenarios.scenarioD !== undefined, "Scenario D exists");
assert(scenarios.scenarioE !== undefined, "Scenario E exists");

// Test scenario by name
const scenarioA = getScenarioByName("Scenario A");
assert(scenarioA !== undefined, "Scenario A retrieved by name");
assertEqual(scenarioA?.name, "Stable Stakeholder Environment", "Scenario A has correct name");

// Test Scenario A structure
assert(scenarioA.stakeholders.length > 0, "Scenario A has stakeholders");
assert(scenarioA.signals.length > 0, "Scenario A has signals");
assert(scenarioA.sentiment.length > 0, "Scenario A has sentiment observations");
assert(scenarioA.behaviour.length > 0, "Scenario A has behaviour observations");
assert(scenarioA.events.length === 0, "Scenario A has no events (stable environment)");
assert(scenarioA.outcomes.length === 0, "Scenario A has no outcomes (stable environment)");
assert(scenarioA.consequences.length === 0, "Scenario A has no consequences (stable environment)");

// Test Scenario B structure
const scenarioB = scenarios.scenarioB;
assert(scenarioB.signals.length > 0, "Scenario B has signals");
assert(scenarioB.sentiment.length > 0, "Scenario B has sentiment observations");
assert(scenarioB.behaviour.length > 0, "Scenario B has behaviour observations");
assert(scenarioB.events.length === 0, "Scenario B has no events yet");
assert(scenarioB.outcomes.length === 0, "Scenario B has no outcomes yet");
assert(scenarioB.consequences.length === 0, "Scenario B has no consequences yet");

// Test Scenario C structure
const scenarioC = scenarios.scenarioC;
assert(scenarioC.signals.length > 0, "Scenario C has signals");
assert(scenarioC.sentiment.length > 0, "Scenario C has sentiment observations");
assert(scenarioC.behaviour.length > 0, "Scenario C has behaviour observations");
assert(scenarioC.events.length > 0, "Scenario C has events (escalating grievances)");
assert(scenarioC.outcomes.length > 0, "Scenario C has outcomes");
assert(scenarioC.consequences.length > 0, "Scenario C has consequences");

// Test Scenario D structure
const scenarioD = scenarios.scenarioD;
assert(scenarioD.signals.length > 0, "Scenario D has signals");
assert(scenarioD.sentiment.length > 0, "Scenario D has sentiment observations");
assert(scenarioD.behaviour.length > 0, "Scenario D has behaviour observations");
assert(scenarioD.events.length > 0, "Scenario D has events (adverse behaviour)");
assert(scenarioD.outcomes.length > 0, "Scenario D has outcomes");
assert(scenarioD.consequences.length > 0, "Scenario D has consequences");

// Test Scenario E structure (complete evidence chain)
const scenarioE = scenarios.scenarioE;
assert(scenarioE.signals.length > 0, "Scenario E has signals");
assert(scenarioE.sentiment.length > 0, "Scenario E has sentiment observations");
assert(scenarioE.behaviour.length > 0, "Scenario E has behaviour observations");
assert(scenarioE.events.length > 0, "Scenario E has events (actual disruption)");
assert(scenarioE.outcomes.length > 0, "Scenario E has outcomes");
assert(scenarioE.consequences.length > 0, "Scenario E has consequences");
assert(scenarioE.predictions !== undefined, "Scenario E has prediction architecture");
assert(scenarioE.predictionOutcomes !== undefined, "Scenario E has prediction outcomes");

// Test evidence classification in scenarios
const allSignals = [
  ...scenarios.scenarioA.signals,
  ...scenarios.scenarioB.signals,
  ...scenarios.scenarioC.signals,
  ...scenarios.scenarioD.signals,
  ...scenarios.scenarioE.signals,
];

for (const signal of allSignals) {
  assert(
    ["Observed", "Calculated", "Inferred"].includes(signal.classification),
    `Signal ${signal.id} has valid evidence classification`,
  );
}

const allSentiment = [
  ...scenarios.scenarioA.sentiment,
  ...scenarios.scenarioB.sentiment,
  ...scenarios.scenarioC.sentiment,
  ...scenarios.scenarioD.sentiment,
  ...scenarios.scenarioE.sentiment,
];

for (const sentiment of allSentiment) {
  assert(
    ["Observed", "Inferred"].includes(sentiment.classification),
    `Sentiment ${sentiment.id} has valid evidence classification`,
  );
}

const allBehaviour = [
  ...scenarios.scenarioA.behaviour,
  ...scenarios.scenarioB.behaviour,
  ...scenarios.scenarioC.behaviour,
  ...scenarios.scenarioD.behaviour,
  ...scenarios.scenarioE.behaviour,
];

for (const behaviour of allBehaviour) {
  assert(
    behaviour.classification === "Observed",
    `Behaviour ${behaviour.id} has Observed classification`,
  );
}

// Test that predictions are not claiming false capabilities
if (scenarios.scenarioE.predictions) {
  for (const prediction of scenarios.scenarioE.predictions) {
    assert(
      prediction.classification === "Predicted",
      `Prediction ${prediction.id} has Predicted classification`,
    );
    
    assert(
      prediction.predictionStatus === "monitoring",
      `Prediction ${prediction.id} has monitoring status (not validated)`,
    );
    
    const hasMethodologyNote = prediction.modelMethod !== undefined && prediction.modelMethod.includes("Not implemented");
    assert(
      hasMethodologyNote === true,
      `Prediction ${prediction.id} acknowledges methodology not implemented`,
    );
  }
}

console.log("");
console.log("All synthetic scenario tests passed.");