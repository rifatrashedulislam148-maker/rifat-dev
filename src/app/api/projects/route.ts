import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return NextResponse.json(allProjects);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, tech, status, image, demoUrl, githubUrl, youtubeUrl, featured } = body;

        if (!title || !description || !tech) {
            return NextResponse.json(
                { error: "Title, description, and tech are required" },
                { status: 400 }
            );
        }

        const [newProject] = await db
            .insert(projects)
            .values({ title, description, tech, status, image, demoUrl, githubUrl, youtubeUrl, featured })
            .returning();

        return NextResponse.json(newProject);
    } catch (error) {
        console.error("Create project error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}