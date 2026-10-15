/**
 * North Star Metric — ONV-12 / ANALYTICS.md §1.
 *
 * Metric: **Qualified Builders Created per Month**
 * Explicitly NOT vanity metrics (signups, pageviews, watch time, streaks).
 */

export type EvidenceHierarchyLevel = "A" | "B" | "C" | "D" | "E";
export type MilestoneType = "M1" | "M2" | "M3" | "M4";

/** Evidence tiers that count toward the "Evidence Verified" pillar. */
const QUALIFYING_EVIDENCE_LEVELS: ReadonlySet<EvidenceHierarchyLevel> =
  new Set(["B", "C", "D"]);

/** Milestones that count toward the "Meaningful Milestone" pillar (DEC-023). */
const QUALIFYING_MILESTONES: ReadonlySet<MilestoneType> = new Set(["M3", "M4"]);

export interface QualifiedBuilderInput {
  /** Milestones the builder has achieved. */
  achievedMilestones: readonly MilestoneType[];
  /** Verified evidence records with their hierarchy level. */
  verifiedEvidence: readonly { level: EvidenceHierarchyLevel }[];
  /** Published artifacts backed by a repo or verified testnet deployment. */
  publishedArtifacts: readonly {
    hasRepository: boolean;
    hasVerifiedDeployment: boolean;
  }[];
  /** Whether the Builder Passport profile is publicly auditable. */
  hasUsableProfile: boolean;
}

export interface QualifiedBuilderResult {
  isQualified: boolean;
  pillars: {
    meaningfulMilestone: boolean;
    evidenceVerified: boolean;
    artifactCreated: boolean;
    usableProfile: boolean;
  };
}

/**
 * Evaluates the four pillars from ANALYTICS.md §1. A builder qualifies only
 * when all four hold. Kept pure so it can run in jobs, dashboards, or tests.
 */
export function evaluateQualifiedBuilder(
  input: QualifiedBuilderInput,
): QualifiedBuilderResult {
  const meaningfulMilestone = input.achievedMilestones.some((m) =>
    QUALIFYING_MILESTONES.has(m),
  );

  const evidenceVerified =
    input.verifiedEvidence.filter((e) =>
      QUALIFYING_EVIDENCE_LEVELS.has(e.level),
    ).length >= 2;

  const artifactCreated = input.publishedArtifacts.some(
    (a) => a.hasRepository || a.hasVerifiedDeployment,
  );

  const usableProfile = input.hasUsableProfile;

  return {
    isQualified:
      meaningfulMilestone && evidenceVerified && artifactCreated && usableProfile,
    pillars: {
      meaningfulMilestone,
      evidenceVerified,
      artifactCreated,
      usableProfile,
    },
  };
}
