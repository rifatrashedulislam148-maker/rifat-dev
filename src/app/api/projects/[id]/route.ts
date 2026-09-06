import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, description, tech, status, image, demoUrl, githubUrl, youtubeUrl, featured } = body;

        const [updated] = await db
            .update(projects)
            .set({ title, description, tech, status, image, demoUrl, githubUrl, youtubeUrl, featured })
            .where(eq(projects.id, Number(id)))
            .returning();

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update project error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(projects).where(eq(projects.id, Number(id)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete project error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}