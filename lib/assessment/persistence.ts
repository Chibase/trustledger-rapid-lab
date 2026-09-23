import type { Assessment, ResponseValue, ProjectProfile } from "./types";

const STORAGE_KEY = "trustledger-rapid-lab-prototype-01-assessment";

export function saveAssessment(assessment: Assessment): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assessment));
  } catch (e) {
    console.error("Failed to save assessment to localStorage:", e);
  }
}

export function loadAssessment(): Assessment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Assessment;
  } catch (e) {
    console.error("Failed to load assessment from localStorage:", e);
    return null;
  }
}

export function clearAssessment(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear assessment from localStorage:", e);
  }
}

export function createEmptyAssessment(): Assessment {
  return {
    id: `assessment-${Date.now()}`,
    projectProfile: {
      projectName: "",
      location: "",
      sector: "",
      phase: "",
      assessor: "",
      assessmentDate: new Date().toISOString().split("T")[0],
      description: "",
    },
    responses: {},
    currentDimensionIndex: 0,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completed: false,
    isDemo: false,
  };
}

export function updateProfile(
  assessment: Assessment,
  profile: ProjectProfile,
): Assessment {
  return {
    ...assessment,
    projectProfile: profile,
    updatedAt: new Date().toISOString(),
  };
}

export function setResponse(
  assessment: Assessment,
  questionId: string,
  value: ResponseValue,
): Assessment {
  return {
    ...assessment,
    responses: { ...assessment.responses, [questionId]: value },
    updatedAt: new Date().toISOString(),
  };
}

export function setCurrentDimension(
  assessment: Assessment,
  index: number,
): Assessment {
  return {
    ...assessment,
    currentDimensionIndex: index,
    updatedAt: new Date().toISOString(),
  };
}

export function markCompleted(assessment: Assessment): Assessment {
  return {
    ...assessment,
    completed: true,
    updatedAt: new Date().toISOString(),
  };
}
