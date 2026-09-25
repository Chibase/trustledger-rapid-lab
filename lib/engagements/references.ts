import { DEMO_PROJECT, type Assessment } from "@/lib/assessment";
import type { Engagement } from "./types";

function unique(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function deriveProjectOptions(
  assessment: Assessment | null,
  engagements: Engagement[],
): string[] {
  return unique([
    assessment?.projectProfile.projectName ?? "",
    ...engagements.map((engagement) => engagement.projectName),
  ]);
}

export function deriveStakeholderOptions(
  assessment: Assessment | null,
  engagements: Engagement[],
): string[] {
  const fromAssessment = assessment?.isDemo ? DEMO_PROJECT.stakeholderGroups : [];
  return unique([
    ...fromAssessment,
    ...engagements.flatMap((engagement) => engagement.stakeholders),
  ]);
}

export function findProjectContext(
  assessment: Assessment | null,
  projectName: string,
) {
  if (!assessment) return null;
  if (assessment.projectProfile.projectName !== projectName) return null;
  return assessment.projectProfile;
}

export function engagementsForStakeholder(
  engagements: Engagement[],
  stakeholder: string,
): Engagement[] {
  return engagements.filter((engagement) =>
    engagement.stakeholders.includes(stakeholder),
  );
}
