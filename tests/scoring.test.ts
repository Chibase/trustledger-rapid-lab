import { describe, it, expect } from "vitest";
import {
  scoreDimension,
  computeDimensionResults,
  computeOverallReadiness,
  computeAssessmentResult,
  getBand,
  INTERPRETATION_BANDS,
  isNA,
  isApplicableResponse,
  DIMENSIONS,
  QUESTIONS,
} from "@/lib/assessment";
import type { ResponseValue } from "@/lib/assessment";

describe("dimension scoring", () => {
  it("scores 100% when all responses are 4 (maximum)", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 4;
    }
    const result = scoreDimension("stakeholder-coverage", responses);
    expect(result.score).toBe(100);
    expect(result.actualPoints).toBe(20);
    expect(result.maxApplicablePoints).toBe(20);
    expect(result.applicableQuestions).toBe(5);
    expect(result.naQuestions).toBe(0);
  });

  it("scores 0% when all responses are 0", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 0;
    }
    const result = scoreDimension("stakeholder-coverage", responses);
    expect(result.score).toBe(0);
    expect(result.actualPoints).toBe(0);
    expect(result.maxApplicablePoints).toBe(20);
  });

  it("scores 50% when all responses are 2", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 2;
    }
    const result = scoreDimension("community-participation", responses);
    expect(result.score).toBe(50);
  });

  it("scores correctly for mixed values", () => {
    const responses: Record<string, ResponseValue> = {
      "cp-1": 3,
      "cp-2": 2,
      "cp-3": 1,
      "cp-4": 4,
      "cp-5": 0,
    };
    const result = scoreDimension("community-participation", responses);
    // actual = 3+2+1+4+0 = 10, max = 20
    expect(result.actualPoints).toBe(10);
    expect(result.maxApplicablePoints).toBe(20);
    expect(result.score).toBe(50);
  });

  it("handles missing responses as N/A (excluded from denominator)", () => {
    const responses: Record<string, ResponseValue> = {
      "sc-1": 4,
      "sc-2": 4,
      // sc-3, sc-4, sc-5 missing
    };
    const result = scoreDimension("stakeholder-coverage", responses);
    expect(result.applicableQuestions).toBe(2);
    expect(result.naQuestions).toBe(3);
    expect(result.actualPoints).toBe(8);
    expect(result.maxApplicablePoints).toBe(8);
    expect(result.score).toBe(100);
  });
});

describe("N/A exclusion", () => {
  it("excludes N/A responses from the denominator", () => {
    const responses: Record<string, ResponseValue> = {
      "gr-1": 4,
      "gr-2": 4,
      "gr-3": "NA",
      "gr-4": "NA",
      "gr-5": "NA",
    };
    const result = scoreDimension("grievance-readiness", responses);
    expect(result.applicableQuestions).toBe(2);
    expect(result.naQuestions).toBe(3);
    expect(result.actualPoints).toBe(8);
    expect(result.maxApplicablePoints).toBe(8);
    expect(result.score).toBe(100);
  });

  it("marks dimension as not applicable when all responses are N/A", () => {
    const responses: Record<string, ResponseValue> = {
      "tc-1": "NA",
      "tc-2": "NA",
      "tc-3": "NA",
      "tc-4": "NA",
      "tc-5": "NA",
    };
    const result = scoreDimension("transparency-commitments", responses);
    expect(result.isApplicable).toBe(false);
    expect(result.score).toBe(0);
    expect(result.applicableQuestions).toBe(0);
  });

  it("isNA correctly identifies N/A values", () => {
    expect(isNA("NA")).toBe(true);
    expect(isNA(0)).toBe(false);
    expect(isNA(4)).toBe(false);
  });

  it("isApplicableResponse correctly identifies applicable values", () => {
    expect(isApplicableResponse("NA")).toBe(false);
    expect(isApplicableResponse(0)).toBe(true);
    expect(isApplicableResponse(4)).toBe(true);
  });
});

describe("overall applicable-dimension averaging", () => {
  it("computes overall as average of applicable dimensions only", () => {
    const responses: Record<string, ResponseValue> = {};
    // Set all to 3 (75%) for 7 dimensions, all N/A for 1 dimension
    for (const q of QUESTIONS) {
      if (q.dimensionId === "social-risk-readiness") {
        responses[q.id] = "NA";
      } else {
        responses[q.id] = 3;
      }
    }
    const dimResults = computeDimensionResults(responses);
    const overall = computeOverallReadiness(dimResults);
    // 7 applicable dims all at 75%, 1 excluded
    expect(overall).toBe(75);
  });

  it("excludes non-applicable dimensions from the average", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 4;
    }
    // Make one dimension all N/A
    const naQuestions = QUESTIONS.filter(
      (q) => q.dimensionId === "stakeholder-coverage",
    );
    for (const q of naQuestions) {
      responses[q.id] = "NA";
    }
    const dimResults = computeDimensionResults(responses);
    const overall = computeOverallReadiness(dimResults);
    // 7 dims at 100%, 1 excluded
    expect(overall).toBe(100);
  });

  it("returns 0 when no dimensions are applicable", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = "NA";
    }
    const dimResults = computeDimensionResults(responses);
    const overall = computeOverallReadiness(dimResults);
    expect(overall).toBe(0);
  });
});

describe("interpretation bands", () => {
  it("returns Preliminary for scores 0-24", () => {
    expect(getBand(0).label).toBe("Preliminary");
    expect(getBand(24).label).toBe("Preliminary");
  });

  it("returns Emerging for scores 25-49", () => {
    expect(getBand(25).label).toBe("Emerging");
    expect(getBand(49).label).toBe("Emerging");
  });

  it("returns Developing for scores 50-69", () => {
    expect(getBand(50).label).toBe("Developing");
    expect(getBand(69).label).toBe("Developing");
  });

  it("returns Established for scores 70-84", () => {
    expect(getBand(70).label).toBe("Established");
    expect(getBand(84).label).toBe("Established");
  });

  it("returns Leading for scores 85-100", () => {
    expect(getBand(85).label).toBe("Leading");
    expect(getBand(100).label).toBe("Leading");
  });

  it("has exactly 5 bands covering 0-100 with no gaps", () => {
    expect(INTERPRETATION_BANDS).toHaveLength(5);
    expect(INTERPRETATION_BANDS[0].min).toBe(0);
    expect(INTERPRETATION_BANDS[4].max).toBe(100);
    for (let i = 1; i < INTERPRETATION_BANDS.length; i++) {
      expect(INTERPRETATION_BANDS[i].min).toBe(
        INTERPRETATION_BANDS[i - 1].max + 1,
      );
    }
  });
});

describe("priority classification", () => {
  it("marks dimensions below threshold as priority", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      if (q.dimensionId === "social-risk-readiness") {
        responses[q.id] = 1; // 25%
      } else {
        responses[q.id] = 4; // 100%
      }
    }
    const results = computeDimensionResults(responses);
    const srResult = results.find((r) => r.dimensionId === "social-risk-readiness");
    expect(srResult?.isPriority).toBe(true);
    expect(srResult?.score).toBe(25);
  });

  it("does not mark dimensions at or above threshold as priority", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 3; // 75%
    }
    const results = computeDimensionResults(responses);
    for (const r of results) {
      expect(r.isPriority).toBe(false);
    }
  });

  it("marks dimensions at or above strength threshold as strengths", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 4; // 100%
    }
    const results = computeDimensionResults(responses);
    for (const r of results) {
      expect(r.isStrength).toBe(true);
    }
  });

  it("does not mark N/A-only dimensions as priority or strength", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      if (q.dimensionId === "stakeholder-coverage") {
        responses[q.id] = "NA";
      } else {
        responses[q.id] = 4;
      }
    }
    const results = computeDimensionResults(responses);
    const scResult = results.find((r) => r.dimensionId === "stakeholder-coverage");
    expect(scResult?.isPriority).toBe(false);
    expect(scResult?.isStrength).toBe(false);
    expect(scResult?.isApplicable).toBe(false);
  });
});

describe("full assessment result", () => {
  it("produces a complete AssessmentResult with all fields", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 2;
    }
    const result = computeAssessmentResult(responses);
    expect(result.overallReadiness).toBe(50);
    expect(result.band.label).toBe("Developing");
    expect(result.dimensionResults).toHaveLength(8);
    // At exactly 50%, no dimensions fall below the priority threshold (<50)
    // so no recommended actions are generated — this is correct behaviour.
    expect(result.recommendedActions.length).toBe(0);
  });

  it("generates recommended actions from priority dimensions", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 0;
    }
    const result = computeAssessmentResult(responses);
    // All 8 dimensions are priority, should have recommendations
    expect(result.recommendedActions.length).toBeGreaterThan(0);
    // Check that high priority is assigned for very low scores
    const highPriority = result.recommendedActions.filter(
      (a) => a.priority === "high",
    );
    expect(highPriority.length).toBeGreaterThan(0);
  });

  it("generates systemic considerations", () => {
    const responses: Record<string, ResponseValue> = {};
    for (const q of QUESTIONS) {
      responses[q.id] = 4;
    }
    const result = computeAssessmentResult(responses);
    expect(result.systemicConsiderations.length).toBeGreaterThan(0);
  });
});

describe("structural integrity", () => {
  it("has exactly 8 dimensions", () => {
    expect(DIMENSIONS).toHaveLength(8);
  });

  it("has exactly 40 questions", () => {
    expect(QUESTIONS).toHaveLength(40);
  });

  it("has exactly 5 questions per dimension", () => {
    for (const dim of DIMENSIONS) {
      const dimQuestions = QUESTIONS.filter(
        (q) => q.dimensionId === dim.id,
      );
      expect(dimQuestions).toHaveLength(5);
    }
  });

  it("has unique dimension IDs", () => {
    const ids = DIMENSIONS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique question IDs", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every question references a valid dimension", () => {
    const dimIds = new Set(DIMENSIONS.map((d) => d.id));
    for (const q of QUESTIONS) {
      expect(dimIds.has(q.dimensionId)).toBe(true);
    }
  });
});
