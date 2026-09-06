import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    purpose: text("purpose").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    tech: text("tech").notNull(),
    status: text("status"),
    image: text("image"),
    demoUrl: text("demo_url"),
    githubUrl: text("github_url"),
    youtubeUrl: text("youtube_url"),
    featured: boolean("featured").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const passwordResetOtps = pgTable("password_reset_otps", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    otp: text("otp").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    used: boolean("used").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});