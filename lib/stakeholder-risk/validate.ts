import { stakeholderConditions } from "./domains";
import { riskQuestions } from "./questions";

const errors: string[] = [];

if (riskQuestions.length !== 40) {
  errors.push(
    `Expected 40 questions, found ${riskQuestions.length}.`,
  );
}

if (stakeholderConditions.length !== 8) {
  errors.push(
    `Expected 8 stakeholder conditions, found ${stakeholderConditions.length}.`,
  );
}

const questionIds = new Set<string>();

for (const question of riskQuestions) {
  if (questionIds.has(question.id)) {
    errors.push(`Duplicate question ID: ${question.id}`);
  }

  questionIds.add(question.id);

  const condition = stakeholderConditions.find(
    (item) => item.id === question.conditionId,
  );

  if (!condition) {
    errors.push(
      `Question ${question.id} references unknown condition: ${question.conditionId}`,
    );
  }

  if (!question.riskLenses || question.riskLenses.length === 0) {
    errors.push(
      `Question ${question.id} has no risk lenses assigned`,
    );
  }
}

for (const condition of stakeholderConditions) {
  const questionsForCondition = riskQuestions.filter(
    (question) => question.conditionId === condition.id,
  );

  if (questionsForCondition.length !== 5) {
    errors.push(
      `Condition ${condition.id} has ${questionsForCondition.length} questions; expected 5.`,
    );
  }

  for (const questionId of condition.questionIds) {
    if (!questionIds.has(questionId)) {
      errors.push(
        `Condition ${condition.id} references missing question: ${questionId}`,
      );
    }
  }
}

// Validate risk lens coverage
const riskLenses = new Set<string>();
for (const question of riskQuestions) {
  for (const lens of question.riskLenses) {
    riskLenses.add(lens);
  }
}

const expectedLenses = ["financial", "operational", "regulatory", "environmental", "social", "political", "reputational", "market", "institutional", "change"];
for (const lens of expectedLenses) {
  if (!riskLenses.has(lens)) {
    errors.push(`Risk lens "${lens}" is not used in any question`);
  }
}

if (errors.length > 0) {
  console.error("Risk assessment validation failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("Risk assessment validation passed.");
console.log(`Stakeholder Conditions: ${stakeholderConditions.length}`);
console.log(`Questions: ${riskQuestions.length}`);
console.log(`Risk Lenses: ${riskLenses.size}`);

for (const condition of stakeholderConditions) {
  const count = riskQuestions.filter(
    (question) => question.conditionId === condition.id,
  ).length;

  console.log(`${condition.name}: ${count} questions`);
}
