import type {
  Engagement,
  EngagementErrors,
  EngagementFilters,
  EngagementSort,
  FollowUpItem,
} from "./types";

export const DEFAULT_FILTERS: EngagementFilters = {
  query: "",
  status: "All",
  type: "All",
  project: "All",
  from: "",
  to: "",
  followUp: "All",
};

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function matchesQuery(engagement: Engagement, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    engagement.projectName,
    engagement.purpose,
    engagement.outcome,
    engagement.notes,
    engagement.participants,
    engagement.location,
    engagement.type,
    engagement.channel,
    engagement.followUp.action,
    engagement.followUp.owner,
    ...engagement.stakeholders,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export function hasOpenFollowUp(engagement: Engagement): boolean {
  return engagement.followUp.required && !engagement.followUp.completed;
}

export function isFollowUpOverdue(
  engagement: Engagement,
  today = todayISO(),
): boolean {
  return (
    hasOpenFollowUp(engagement) &&
    !!engagement.followUp.dueDate &&
    engagement.followUp.dueDate < today
  );
}

export function filterEngagements(
  engagements: Engagement[],
  filters: EngagementFilters,
  today = todayISO(),
): Engagement[] {
  return engagements.filter((engagement) => {
    if (!matchesQuery(engagement, filters.query)) return false;
    if (filters.status !== "All" && engagement.status !== filters.status)
      return false;
    if (filters.type !== "All" && engagement.type !== filters.type) return false;
    if (filters.project !== "All" && engagement.projectName !== filters.project)
      return false;
    if (filters.from && engagement.date < filters.from) return false;
    if (filters.to && engagement.date > filters.to) return false;
    if (filters.followUp === "Open" && !hasOpenFollowUp(engagement)) return false;
    if (filters.followUp === "Overdue" && !isFollowUpOverdue(engagement, today))
      return false;
    return true;
  });
}

export function sortEngagements(
  engagements: Engagement[],
  sort: EngagementSort,
): Engagement[] {
  const sorted = [...engagements];
  sorted.sort((a, b) => {
    if (sort === "updated-desc") return b.updatedAt.localeCompare(a.updatedAt);
    const comparison = a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
    return sort === "date-asc" ? comparison : -comparison;
  });
  return sorted;
}

export function collectFollowUps(
  engagements: Engagement[],
  today = todayISO(),
): FollowUpItem[] {
  return engagements
    .filter(hasOpenFollowUp)
    .map((engagement) => ({
      engagementId: engagement.id,
      projectName: engagement.projectName,
      action: engagement.followUp.action,
      owner: engagement.followUp.owner,
      dueDate: engagement.followUp.dueDate,
      isOverdue: isFollowUpOverdue(engagement, today),
    }))
    .sort((a, b) => {
      if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
}

export function buildRelatedTimeline(
  engagements: Engagement[],
  engagement: Engagement,
): Engagement[] {
  return sortEngagements(
    engagements.filter(
      (candidate) =>
        candidate.id !== engagement.id &&
        (candidate.projectName === engagement.projectName ||
          candidate.stakeholders.some((s) =>
            engagement.stakeholders.includes(s),
          )),
    ),
    "date-desc",
  );
}

export function validateEngagement(engagement: Engagement): EngagementErrors {
  const errors: EngagementErrors = {};
  if (!engagement.projectName.trim())
    errors.projectName = "Select the project this engagement belongs to.";
  if (engagement.stakeholders.length === 0)
    errors.stakeholders = "Record at least one stakeholder.";
  if (!engagement.date) errors.date = "Enter the engagement date.";
  if (!engagement.type) errors.type = "Select an engagement type.";
  if (!engagement.channel) errors.channel = "Select an engagement channel.";
  if (!engagement.purpose.trim())
    errors.purpose = "Describe the purpose or topic of the engagement.";
  if (engagement.status === "Completed" && !engagement.outcome.trim())
    errors.outcome = "Record the outcome before marking an engagement completed.";
  if (engagement.followUp.required && !engagement.followUp.action.trim())
    errors.followUpAction = "Describe the follow-up action.";
  if (engagement.followUp.required && !engagement.followUp.dueDate)
    errors.followUpDueDate = "Set a due date for the follow-up action.";
  return errors;
}

export function formatEngagementDate(date: string, time: string): string {
  if (!date) return "—";
  const parsed = new Date(`${date}T${time || "00:00"}`);
  if (Number.isNaN(parsed.getTime())) return date;
  const formatted = parsed.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return time ? `${formatted} · ${time}` : formatted;
}
