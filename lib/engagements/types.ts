export const ENGAGEMENT_TYPES = [
  "Community meeting",
  "Focus group",
  "One-on-one meeting",
  "Site visit",
  "Public information session",
  "Formal consultation",
  "Grievance discussion",
  "Written correspondence",
] as const;

export type EngagementType = (typeof ENGAGEMENT_TYPES)[number];

export const ENGAGEMENT_CHANNELS = [
  "In person",
  "Telephone",
  "Video call",
  "Email",
  "WhatsApp",
  "Written letter",
  "Community radio",
] as const;

export type EngagementChannel = (typeof ENGAGEMENT_CHANNELS)[number];

export const ENGAGEMENT_STATUSES = ["Planned", "Completed", "Cancelled"] as const;

export type EngagementStatus = (typeof ENGAGEMENT_STATUSES)[number];

export const STATUS_STYLES: Record<
  EngagementStatus,
  { badge: string; dot: string }
> = {
  Planned: { badge: "bg-[#ccfbf1] text-[#0f766e]", dot: "#0f766e" },
  Completed: { badge: "bg-green-100 text-green-700", dot: "#16a34a" },
  Cancelled: { badge: "bg-gray-100 text-gray-500", dot: "#9ca3af" },
};

export interface FollowUp {
  required: boolean;
  action: string;
  owner: string;
  dueDate: string;
  completed: boolean;
}

export interface Engagement {
  id: string;
  projectName: string;
  stakeholders: string[];
  date: string;
  time: string;
  type: EngagementType | "";
  channel: EngagementChannel | "";
  location: string;
  purpose: string;
  participants: string;
  outcome: string;
  notes: string;
  status: EngagementStatus;
  followUp: FollowUp;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
}

export type EngagementView = "registry" | "form" | "detail";

export type EngagementSort = "date-desc" | "date-asc" | "updated-desc";

export interface EngagementFilters {
  query: string;
  status: EngagementStatus | "All";
  type: EngagementType | "All";
  project: string;
  from: string;
  to: string;
  followUp: "All" | "Open" | "Overdue";
}

export type EngagementErrors = Partial<
  Record<
    | "projectName"
    | "stakeholders"
    | "date"
    | "type"
    | "channel"
    | "purpose"
    | "outcome"
    | "followUpAction"
    | "followUpDueDate",
    string
  >
>;

export interface FollowUpItem {
  engagementId: string;
  projectName: string;
  action: string;
  owner: string;
  dueDate: string;
  isOverdue: boolean;
}
