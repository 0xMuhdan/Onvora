import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/*
 * ONVORA — CANONICAL DATABASE SCHEMA (DEC-016, DEC-009)
 * Source of truth: SCHEMA.md
 * Conventions: snake_case plural tables, snake_case columns, UUID primary keys,
 * created_at / updated_at audit columns on primary entities.
 */

/* ------------------------------------------------------------------ *
 * 2.1 Identity & Authentication (DEC-017)
 * ------------------------------------------------------------------ */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(), // must end with @gmail.com
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash"), // DEC-030: strong password scrypt hash
  role: text("role").notNull().default("learner"), // learner | mentor | organizer | judge | admin
  status: text("status").notNull().default("active"), // active | suspended
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  goal: text("goal"),
  targetRole: text("target_role"),
  availabilityStatus: text("availability_status").default(
    "open_to_collaborate",
  ), // open_to_collaborate | open_to_opportunity | busy
  visibility: text("visibility").default("public"), // public | private | unlisted
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const wallets = pgTable("wallets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  chainAdapterCode: text("chain_adapter_code").notNull(), // ETH, SOL, ...
  address: text("address").notNull(),
  verifiedAt: timestamp("verified_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  visibility: text("visibility").default("private"), // private | public
});

/* ------------------------------------------------------------------ *
 * 2.2 Onboarding & Diagnostic (ONV-03)
 * ------------------------------------------------------------------ */

export const diagnostics = pgTable("diagnostics", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  version: integer("version").notNull().default(1),
  answers: jsonb("answers").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const startingPoints = pgTable("starting_points", {
  id: uuid("id").defaultRandom().primaryKey(),
  diagnosticId: uuid("diagnostic_id")
    .notNull()
    .references(() => diagnostics.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  narrativeSummary: text("narrative_summary").notNull(),
  startUnitSlug: text("start_unit_slug").notNull(),
  skippedUnitSlugs: jsonb("skipped_unit_slugs").default([]),
  reasons: jsonb("reasons").notNull(),
});

/* ------------------------------------------------------------------ *
 * 2.3 Learning Engine & Structured CMS (DEC-020)
 * ------------------------------------------------------------------ */

export const tracks = pgTable("tracks", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  knowledgeScope: text("knowledge_scope").notNull().default("core"), // core | ecosystem
  chainAdapterCode: text("chain_adapter_code"),
  isPublished: boolean("is_published").default(false),
});

export const units = pgTable("units", {
  id: uuid("id").defaultRandom().primaryKey(),
  trackId: uuid("track_id")
    .notNull()
    .references(() => tracks.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  why: text("why").notNull(),
  targetLevel: text("target_level").notNull(), // awareness | foundation | developing | ...
  prerequisites: jsonb("prerequisites").default([]),
  version: integer("version").notNull().default(1),
  // draft | technical_review | curriculum_review | approved | published | needs_review | deprecated | archived
  status: text("status").notNull().default("draft"),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  unitId: uuid("unit_id")
    .notNull()
    .references(() => units.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  orderIndex: integer("order_index").notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull().default(15),
  version: integer("version").notNull().default(1),
});

// Mandatory Learning Objective per lesson (DEC-020)
export const learningObjectives = pgTable("learning_objectives", {
  id: text("id").primaryKey(), // e.g. "LO-ETH-001"
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id),
  description: text("description").notNull(),
});

export const contentBlocks = pgTable("content_blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id),
  // text | code | interactive | simulation | callout | terminal | quiz | checkpoint_ref
  blockType: text("block_type").notNull(),
  orderIndex: integer("order_index").notNull(),
  contentData: jsonb("content_data").notNull(),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("in_progress"), // in_progress | completed
  completedAt: timestamp("completed_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/* ------------------------------------------------------------------ *
 * 2.4 Evidence & 5-Level Skill Engine (DEC-024, DEC-027)
 * ------------------------------------------------------------------ */

export const evidence = pgTable("evidence", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  // A Contribution | B Independent Project | C Guided Project | D Applied Assessment | E Knowledge Assessment
  hierarchyLevel: text("hierarchy_level").notNull(),
  sourceType: text("source_type").notNull(), // assessment | practice | project | deployment | review
  sourceId: text("source_id").notNull(),
  sourceEventId: text("source_event_id").notNull(), // traceable to analytics event
  skillSlugs: jsonb("skill_slugs").notNull(),
  visibility: text("visibility").default("public"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const userSkills = pgTable("user_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  skillSlug: text("skill_slug").notNull(),
  // level_0_awareness | level_1_foundation | level_2_developing | level_3_proficient | level_4_advanced
  level: text("level").notNull(),
  isAging: boolean("is_aging").default(false), // true if last evidence > 18 months (DEC-026)
  lastEvidenceAt: timestamp("last_evidence_at", { withTimezone: true }),
  computedAt: timestamp("computed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/* ------------------------------------------------------------------ *
 * 2.5 Projects, Deployments & Reviews (DEC-003)
 * ------------------------------------------------------------------ */

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  targetUser: text("target_user").notNull(),
  techStack: jsonb("tech_stack").notNull(),
  // guided | independent | capstone | challenge_submission | hackathon_submission
  type: text("type").notNull(),
  // idea | planning | building | testing | deployed | published | archived
  status: text("status").notNull().default("idea"),
  visibility: text("visibility").default("public"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
});

export const deployments = pgTable("deployments", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  chainAdapterCode: text("chain_adapter_code").notNull(),
  networkType: text("network_type").notNull(), // simulation | testnet | mainnet
  contractAddress: text("contract_address").notNull(),
  transactionHash: text("transaction_hash").notNull(),
  isVerified: boolean("is_verified").default(false),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
});

export const projectReviews = pgTable("project_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  reviewerId: uuid("reviewer_id").references(() => users.id),
  source: text("source").notNull(), // automated | rubric_self | peer | mentor | ai_assist
  strengths: jsonb("strengths").notNull(),
  improvements: jsonb("improvements").notNull(),
  nextPractice: jsonb("next_practice").notNull(),
  dimensionScores: jsonb("dimension_scores").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/* ------------------------------------------------------------------ *
 * 2.6 Analytics & Audit Trail (ONV-12)
 * ------------------------------------------------------------------ */

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id").references(() => users.id),
  anonymousId: text("anonymous_id"),
  properties: jsonb("properties").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: uuid("actor_id").references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  details: jsonb("details").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
