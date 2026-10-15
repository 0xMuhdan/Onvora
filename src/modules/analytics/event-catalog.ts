/**
 * Canonical Event Catalog — ONV-12 / ANALYTICS.md §4.
 * Event naming convention: `<domain>.<past_tense_verb>` (tech-context.md).
 *
 * Every evidence record must reference a `sourceEventId` from this catalog,
 * so the catalog is the single source of truth for traceability.
 */

export const ANALYTICS_EVENTS = {
  auth: ["user.created", "user.logged_in", "wallet.linked"],
  diagnostic: ["diagnostic.completed", "diagnostic.skipped"],
  learning: [
    "track.enrolled",
    "lesson.started",
    "lesson.completed",
    "simulation.run",
  ],
  practice: [
    "practice.submitted",
    "practice.passed",
    "practice.solution_viewed",
    "mistake.recorded",
    "mistake.resolved",
  ],
  project: [
    "project.created",
    "project.status_changed",
    "deployment.verified",
    "project.published",
  ],
  review: ["project_review.requested", "project_review.completed"],
  skill: ["evidence.created", "milestone.achieved", "skill.level_changed"],
  outcome: ["opportunity.matched", "application.submitted", "team.match.accepted"],
} as const;

export type AnalyticsDomain = keyof typeof ANALYTICS_EVENTS;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[AnalyticsDomain][number];

export const ALL_ANALYTICS_EVENTS: readonly AnalyticsEventName[] =
  Object.values(ANALYTICS_EVENTS).flat() as AnalyticsEventName[];

const EVENT_SET = new Set<string>(ALL_ANALYTICS_EVENTS);

export function isCanonicalEvent(name: string): name is AnalyticsEventName {
  return EVENT_SET.has(name);
}

/** Payload contract shared by every analytics emission (ANALYTICS.md §4). */
export interface AnalyticsEventPayload {
  name: AnalyticsEventName;
  userId?: string;
  anonymousId?: string;
  properties: Record<string, unknown>;
  occurredAt: string; // ISO 8601
}
