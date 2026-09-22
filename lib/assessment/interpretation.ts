export type ReadinessBand =
  | "Foundational gaps"
  | "Developing"
  | "Established but vulnerable"
  | "Strong foundation"
  | "Highly developed";

export type PriorityLevel =
  | "High Priority"
  | "Attention Required"
  | "Monitor"
  | "Established";

export type ReadinessInterpretation = {
  band: ReadinessBand;
  priority: PriorityLevel;
  description: string;
};

export function getReadinessBand(score: number): ReadinessBand {
  if (score < 0 || score > 100) {
    throw new Error(`Score must be between 0 and 100. Received: ${score}`);
  }

  if (score < 40) {
    return "Foundational gaps";
  }

  if (score < 60) {
    return "Developing";
  }

  if (score < 75) {
    return "Established but vulnerable";
  }

  if (score < 90) {
    return "Strong foundation";
  }

  return "Highly developed";
}

export function getPriorityLevel(score: number): PriorityLevel {
  if (score < 0 || score > 100) {
    throw new Error(`Score must be between 0 and 100. Received: ${score}`);
  }

  if (score < 40) {
    return "High Priority";
  }

  if (score < 60) {
    return "Attention Required";
  }

  if (score < 75) {
    return "Monitor";
  }

  return "Established";
}

export function getReadinessDescription(
  band: ReadinessBand,
): string {
  switch (band) {
    case "Foundational gaps":
      return "Important social licence foundations appear to be insufficiently developed and require focused attention.";

    case "Developing":
      return "Some social licence foundations are in place, but important gaps remain and should be addressed.";

    case "Established but vulnerable":
      return "Core practices are established, but weaknesses may create vulnerability if stakeholder or project conditions change.";

    case "Strong foundation":
      return "The project demonstrates a strong foundation of practices supporting stakeholder relationships and social readiness.";

    case "Highly developed":
      return "The project demonstrates highly developed practices across the assessed areas, subject to the quality of the underlying evidence.";

    default:
      return "";
  }
}

export function interpretReadiness(
  score: number,
): ReadinessInterpretation {
  const band = getReadinessBand(score);
  const priority = getPriorityLevel(score);

  return {
    band,
    priority,
    description: getReadinessDescription(band),
  };
}