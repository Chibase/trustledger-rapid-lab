import { describe, it, expect, beforeEach } from "vitest";
import {
  DEFAULT_FILTERS,
  DEMO_ENGAGEMENTS,
  buildRelatedTimeline,
  clearEngagements,
  collectFollowUps,
  createEmptyEngagement,
  deriveProjectOptions,
  deriveStakeholderOptions,
  engagementsForStakeholder,
  filterEngagements,
  findProjectContext,
  hasOpenFollowUp,
  isFollowUpOverdue,
  loadEngagements,
  removeEngagement,
  saveEngagements,
  setFollowUpCompleted,
  sortEngagements,
  upsertEngagement,
  validateEngagement,
  type Engagement,
} from "@/lib/engagements";
import { DEMO_PROJECT, type Assessment } from "@/lib/assessment";

function makeEngagement(overrides: Partial<Engagement> = {}): Engagement {
  return {
    ...createEmptyEngagement("Ndlovu Water Infrastructure Project"),
    stakeholders: ["Ward councillors"],
    date: "2025-06-01",
    time: "10:00",
    type: "Community meeting",
    channel: "In person",
    purpose: "Quarterly community feedback session",
    status: "Planned",
    ...overrides,
  };
}

const demoAssessment: Assessment = {
  id: "demo-1",
  projectProfile: DEMO_PROJECT.profile,
  responses: DEMO_PROJECT.responses,
  currentDimensionIndex: 0,
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: true,
  isDemo: true,
};

describe("engagement persistence", () => {
  beforeEach(() => {
    clearEngagements();
  });

  it("returns an empty register when nothing is stored", () => {
    expect(loadEngagements()).toEqual([]);
  });

  it("round-trips engagements through local storage", () => {
    const engagement = makeEngagement({ id: "e1" });
    saveEngagements([engagement]);
    const loaded = loadEngagements();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].purpose).toBe("Quarterly community feedback session");
  });

  it("adds a new engagement and updates an existing one", () => {
    const engagement = makeEngagement({ id: "e1" });
    const added = upsertEngagement([], engagement);
    expect(added).toHaveLength(1);

    const edited = upsertEngagement(added, {
      ...engagement,
      purpose: "Revised purpose",
    });
    expect(edited).toHaveLength(1);
    expect(edited[0].purpose).toBe("Revised purpose");
  });

  it("removes an engagement by id", () => {
    const list = [makeEngagement({ id: "e1" }), makeEngagement({ id: "e2" })];
    expect(removeEngagement(list, "e1").map((e) => e.id)).toEqual(["e2"]);
  });

  it("marks a follow-up as completed", () => {
    const list = [
      makeEngagement({
        id: "e1",
        followUp: {
          required: true,
          action: "Send minutes",
          owner: "Community liaison",
          dueDate: "2025-06-10",
          completed: false,
        },
      }),
    ];
    const updated = setFollowUpCompleted(list, "e1", true);
    expect(updated[0].followUp.completed).toBe(true);
    expect(hasOpenFollowUp(updated[0])).toBe(false);
  });
});

describe("engagement validation", () => {
  it("accepts a complete record", () => {
    expect(validateEngagement(makeEngagement())).toEqual({});
  });

  it("requires project, stakeholders, date, type, channel and purpose", () => {
    const errors = validateEngagement(
      makeEngagement({
        projectName: "",
        stakeholders: [],
        date: "",
        type: "",
        channel: "",
        purpose: "  ",
      }),
    );
    expect(Object.keys(errors).sort()).toEqual([
      "channel",
      "date",
      "projectName",
      "purpose",
      "stakeholders",
      "type",
    ]);
  });

  it("requires an outcome before an engagement can be completed", () => {
    const errors = validateEngagement(
      makeEngagement({ status: "Completed", outcome: "" }),
    );
    expect(errors.outcome).toBeDefined();
  });

  it("requires an action and due date when follow-up is required", () => {
    const errors = validateEngagement(
      makeEngagement({
        followUp: {
          required: true,
          action: "",
          owner: "",
          dueDate: "",
          completed: false,
        },
      }),
    );
    expect(errors.followUpAction).toBeDefined();
    expect(errors.followUpDueDate).toBeDefined();
  });
});

describe("engagement filtering and sorting", () => {
  const list = [
    makeEngagement({
      id: "e1",
      date: "2025-01-10",
      status: "Completed",
      outcome: "Agreed to share the water testing schedule",
      type: "Community meeting",
      stakeholders: ["Ward councillors"],
    }),
    makeEngagement({
      id: "e2",
      date: "2025-03-05",
      status: "Planned",
      type: "Site visit",
      projectName: "Other Project",
      stakeholders: ["Affected landowners"],
      followUp: {
        required: true,
        action: "Confirm access route",
        owner: "Site manager",
        dueDate: "2025-03-20",
        completed: false,
      },
    }),
    makeEngagement({
      id: "e3",
      date: "2025-05-20",
      status: "Cancelled",
      type: "Focus group",
      stakeholders: ["Youth forum"],
    }),
  ];

  it("returns everything with default filters", () => {
    expect(filterEngagements(list, DEFAULT_FILTERS)).toHaveLength(3);
  });

  it("searches across stakeholders, outcome and follow-up text", () => {
    expect(
      filterEngagements(list, { ...DEFAULT_FILTERS, query: "youth" }),
    ).toHaveLength(1);
    expect(
      filterEngagements(list, { ...DEFAULT_FILTERS, query: "access route" }),
    ).toHaveLength(1);
    expect(
      filterEngagements(list, { ...DEFAULT_FILTERS, query: "water testing" }),
    ).toHaveLength(1);
  });

  it("filters by status, type, project and date range", () => {
    expect(
      filterEngagements(list, { ...DEFAULT_FILTERS, status: "Cancelled" }),
    ).toHaveLength(1);
    expect(
      filterEngagements(list, { ...DEFAULT_FILTERS, type: "Site visit" }),
    ).toHaveLength(1);
    expect(
      filterEngagements(list, { ...DEFAULT_FILTERS, project: "Other Project" }),
    ).toHaveLength(1);
    expect(
      filterEngagements(list, {
        ...DEFAULT_FILTERS,
        from: "2025-02-01",
        to: "2025-04-01",
      }).map((e) => e.id),
    ).toEqual(["e2"]);
  });

  it("filters open and overdue follow-ups", () => {
    expect(
      filterEngagements(
        list,
        { ...DEFAULT_FILTERS, followUp: "Open" },
        "2025-03-10",
      ).map((e) => e.id),
    ).toEqual(["e2"]);
    expect(
      filterEngagements(
        list,
        { ...DEFAULT_FILTERS, followUp: "Overdue" },
        "2025-03-10",
      ),
    ).toHaveLength(0);
    expect(
      filterEngagements(
        list,
        { ...DEFAULT_FILTERS, followUp: "Overdue" },
        "2025-04-10",
      ).map((e) => e.id),
    ).toEqual(["e2"]);
  });

  it("sorts by newest and oldest engagement date", () => {
    expect(sortEngagements(list, "date-desc").map((e) => e.id)).toEqual([
      "e3",
      "e2",
      "e1",
    ]);
    expect(sortEngagements(list, "date-asc").map((e) => e.id)).toEqual([
      "e1",
      "e2",
      "e3",
    ]);
  });

  it("collects open follow-ups with overdue items first", () => {
    const followUps = collectFollowUps(list, "2025-04-10");
    expect(followUps).toHaveLength(1);
    expect(followUps[0].engagementId).toBe("e2");
    expect(followUps[0].isOverdue).toBe(true);
    expect(isFollowUpOverdue(list[1], "2025-04-10")).toBe(true);
  });

  it("builds a related timeline from shared project or stakeholders", () => {
    const related = buildRelatedTimeline(list, list[0]);
    expect(related.map((e) => e.id)).toEqual(["e3"]);
  });
});

describe("engagement references", () => {
  it("derives project options from the assessment and register", () => {
    expect(
      deriveProjectOptions(demoAssessment, [
        makeEngagement({ projectName: "Other Project" }),
      ]),
    ).toEqual(["Ndlovu Water Infrastructure Project", "Other Project"]);
  });

  it("derives stakeholder options from the demonstration project", () => {
    const options = deriveStakeholderOptions(demoAssessment, []);
    expect(options.length).toBe(DEMO_PROJECT.stakeholderGroups.length);
  });

  it("only links a project profile when the names match", () => {
    expect(
      findProjectContext(demoAssessment, "Ndlovu Water Infrastructure Project"),
    ).toBe(demoAssessment.projectProfile);
    expect(findProjectContext(demoAssessment, "Other Project")).toBeNull();
    expect(findProjectContext(null, "Any")).toBeNull();
  });

  it("finds engagements for a stakeholder", () => {
    const list = [
      makeEngagement({ id: "e1", stakeholders: ["Ward councillors"] }),
      makeEngagement({ id: "e2", stakeholders: ["Youth forum"] }),
    ];
    expect(
      engagementsForStakeholder(list, "Youth forum").map((e) => e.id),
    ).toEqual(["e2"]);
  });
});

describe("demonstration engagements", () => {
  it("are valid records flagged as synthetic", () => {
    expect(DEMO_ENGAGEMENTS.length).toBeGreaterThan(3);
    for (const engagement of DEMO_ENGAGEMENTS) {
      expect(engagement.isDemo).toBe(true);
      expect(validateEngagement(engagement)).toEqual({});
    }
  });

  it("include at least one open follow-up action", () => {
    expect(DEMO_ENGAGEMENTS.some(hasOpenFollowUp)).toBe(true);
  });
});
