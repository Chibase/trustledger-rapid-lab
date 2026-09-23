import { describe, it, expect, beforeEach } from "vitest";
import {
  saveAssessment,
  loadAssessment,
  clearAssessment,
  createEmptyAssessment,
  updateProfile,
  setResponse,
  markCompleted,
} from "@/lib/assessment";
import { DEMO_PROJECT } from "@/lib/assessment";
import { computeAssessmentResult } from "@/lib/assessment";

describe("demonstration project", () => {
  it("has a complete project profile", () => {
    const profile = DEMO_PROJECT.profile;
    expect(profile.projectName).toBe("Ndlovu Water Infrastructure Project");
    expect(profile.location).toBe("Eastern Cape, South Africa");
    expect(profile.sector).toBe("Water Infrastructure");
    expect(profile.phase).toBe("Construction");
  });

  it("has responses for all 40 questions", () => {
    const responseIds = Object.keys(DEMO_PROJECT.responses);
    expect(responseIds).toHaveLength(40);
  });

  it("produces a valid assessment result", () => {
    const result = computeAssessmentResult(DEMO_PROJECT.responses);
    expect(result.overallReadiness).toBeGreaterThan(0);
    expect(result.overallReadiness).toBeLessThanOrEqual(100);
    expect(result.dimensionResults).toHaveLength(8);
    expect(result.band.label).toBeDefined();
  });

  it("has synthetic stakeholder groups", () => {
    expect(DEMO_PROJECT.stakeholderGroups.length).toBeGreaterThan(5);
    expect(DEMO_PROJECT.stakeholderGroups).toContain(
      "Traditional leadership (AmaNdlovu tribal authority)",
    );
  });

  it("includes at least one N/A response", () => {
    const naResponses = Object.entries(DEMO_PROJECT.responses).filter(
      ([, v]) => v === "NA",
    );
    expect(naResponses.length).toBeGreaterThan(0);
  });
});

describe("persistence (localStorage)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates an empty assessment with correct defaults", () => {
    const a = createEmptyAssessment();
    expect(a.projectProfile.projectName).toBe("");
    expect(a.responses).toEqual({});
    expect(a.currentDimensionIndex).toBe(0);
    expect(a.completed).toBe(false);
    expect(a.isDemo).toBe(false);
  });

  it("saves and loads an assessment", () => {
    const a = createEmptyAssessment();
    a.projectProfile.projectName = "Test Project";
    saveAssessment(a);
    const loaded = loadAssessment();
    expect(loaded).not.toBeNull();
    expect(loaded!.projectProfile.projectName).toBe("Test Project");
  });

  it("returns null when no assessment is saved", () => {
    const loaded = loadAssessment();
    expect(loaded).toBeNull();
  });

  it("clears assessment from localStorage", () => {
    const a = createEmptyAssessment();
    saveAssessment(a);
    clearAssessment();
    const loaded = loadAssessment();
    expect(loaded).toBeNull();
  });

  it("preserves responses through save/load cycle", () => {
    const a = createEmptyAssessment();
    const updated = setResponse(a, "sc-1", 3);
    const updated2 = setResponse(updated, "sc-2", "NA");
    saveAssessment(updated2);
    const loaded = loadAssessment();
    expect(loaded!.responses["sc-1"]).toBe(3);
    expect(loaded!.responses["sc-2"]).toBe("NA");
  });

  it("updates profile correctly", () => {
    const a = createEmptyAssessment();
    const updated = updateProfile(a, {
      ...a.projectProfile,
      projectName: "Updated Name",
    });
    expect(updated.projectProfile.projectName).toBe("Updated Name");
  });

  it("marks assessment as completed", () => {
    const a = createEmptyAssessment();
    const completed = markCompleted(a);
    expect(completed.completed).toBe(true);
  });
});
