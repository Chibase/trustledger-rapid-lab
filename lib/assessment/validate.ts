import { assessmentDimensions } from "./dimensions";
import { assessmentQuestions } from "./questions";

const errors: string[] = [];

if (assessmentQuestions.length !== 40) {
  errors.push(
    `Expected 40 questions, found ${assessmentQuestions.length}.`,
  );
}

if (assessmentDimensions.length !== 8) {
  errors.push(
    `Expected 8 dimensions, found ${assessmentDimensions.length}.`,
  );
}

const questionIds = new Set<string>();

for (const question of assessmentQuestions) {
  if (questionIds.has(question.id)) {
    errors.push(`Duplicate question ID: ${question.id}`);
  }

  questionIds.add(question.id);

  const dimension = assessmentDimensions.find(
    (item) => item.id === question.dimensionId,
  );

  if (!dimension) {
    errors.push(
      `Question ${question.id} references unknown dimension: ${question.dimensionId}`,
    );
  }
}

for (const dimension of assessmentDimensions) {
  const questionsForDimension = assessmentQuestions.filter(
    (question) => question.dimensionId === dimension.id,
  );

  if (questionsForDimension.length !== 5) {
    errors.push(
      `Dimension ${dimension.id} has ${questionsForDimension.length} questions; expected 5.`,
    );
  }

  for (const questionId of dimension.questionIds) {
    if (!questionIds.has(questionId)) {
      errors.push(
        `Dimension ${dimension.id} references missing question: ${questionId}`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Assessment validation failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("Assessment validation passed.");
console.log(`Dimensions: ${assessmentDimensions.length}`);
console.log(`Questions: ${assessmentQuestions.length}`);

for (const dimension of assessmentDimensions) {
  const count = assessmentQuestions.filter(
    (question) => question.dimensionId === dimension.id,
  ).length;

  console.log(`${dimension.name}: ${count} questions`);
}