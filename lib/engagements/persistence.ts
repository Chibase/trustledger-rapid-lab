import type { Engagement } from "./types";

const STORAGE_KEY = "trustledger-rapid-lab-prototype-01-engagements";

export function saveEngagements(engagements: Engagement[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(engagements));
  } catch (e) {
    console.error("Failed to save engagements to localStorage:", e);
  }
}

export function loadEngagements(): Engagement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Engagement[]) : [];
  } catch (e) {
    console.error("Failed to load engagements from localStorage:", e);
    return [];
  }
}

export function clearEngagements(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear engagements from localStorage:", e);
  }
}

export function createEmptyEngagement(projectName = ""): Engagement {
  const now = new Date().toISOString();
  return {
    id: `engagement-${Date.now()}`,
    projectName,
    stakeholders: [],
    date: now.split("T")[0],
    time: "",
    type: "",
    channel: "",
    location: "",
    purpose: "",
    participants: "",
    outcome: "",
    notes: "",
    status: "Planned",
    followUp: {
      required: false,
      action: "",
      owner: "",
      dueDate: "",
      completed: false,
    },
    createdAt: now,
    updatedAt: now,
    isDemo: false,
  };
}

export function upsertEngagement(
  engagements: Engagement[],
  engagement: Engagement,
): Engagement[] {
  const updated: Engagement = {
    ...engagement,
    updatedAt: new Date().toISOString(),
  };
  const exists = engagements.some((e) => e.id === updated.id);
  return exists
    ? engagements.map((e) => (e.id === updated.id ? updated : e))
    : [...engagements, updated];
}

export function removeEngagement(
  engagements: Engagement[],
  id: string,
): Engagement[] {
  return engagements.filter((e) => e.id !== id);
}

export function setFollowUpCompleted(
  engagements: Engagement[],
  id: string,
  completed: boolean,
): Engagement[] {
  return engagements.map((e) =>
    e.id === id
      ? {
          ...e,
          followUp: { ...e.followUp, completed },
          updatedAt: new Date().toISOString(),
        }
      : e,
  );
}
