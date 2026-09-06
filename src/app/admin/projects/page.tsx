"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { Loader2, ArrowLeft, Plus, Pencil, Trash2, X } from "lucide-react";
import Link from "next/link";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string;
    status: string | null;
    image: string | null;
    demoUrl: string | null;
    githubUrl: string | null;
    youtubeUrl: string | null;
    featured: boolean;
}

const emptyForm = {
    title: "",
    description: "",
    tech: "",
    status: "",
    image: "",
    demoUrl: "",
    githubUrl: "",
    youtubeUrl: "",
};

export default function AdminProjectsPage() {
    const { user, checking } = useAdminAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) fetchProjects();
    }, [user]);

    async function fetchProjects() {
        setLoading(true);
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
        setLoading(false);
    }

    function openAddForm() {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(true);
    }

    function openEditForm(project: Project) {
        setForm({
            title: project.title,
            description: project.description,
            tech: project.tech,
            status: project.status || "",
            image: project.image || "",
            demoUrl: project.demoUrl || "",
            githubUrl: project.githubUrl || "",
            youtubeUrl: project.youtubeUrl || "",
        });
        setEditingId(project.id);
        setShowForm(true);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
        const method = editingId ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, featured: false }),
        });

        setSaving(false);
        setShowForm(false);
        fetchProjects();
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this project?")) return;
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        fetchProjects();
    }

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background px-6 py-12">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link
                            href="/admin"
                            className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold">Manage Projects</h1>
                    </div>
                    <button
                        onClick={openAddForm}
                        className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white"
                    >
                        <Plus className="h-4 w-4" />
                        Add Project
                    </button>
                </div>

                {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                    <div className="flex flex-col gap-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-start justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
                            >
                                <div>
                                    <h3 className="font-semibold">{project.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {project.tech}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditForm(project)}
                                        className="rounded-full border border-white/10 bg-white/5 p-2 hover:border-white/25"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="rounded-full border border-white/10 bg-white/5 p-2 hover:border-red-400/40"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No projects yet. Click &quot;Add Project&quot; to create one.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
                    <form
                        onSubmit={handleSave}
                        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0a14] p-6"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                {editingId ? "Edit Project" : "Add Project"}
                            </h2>
                            <button type="button" onClick={() => setShowForm(false)}>
                                <X className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            <input
                                required
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <textarea
                                required
                                rows={3}
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <input
                                required
                                placeholder="Tech (comma-separated, e.g. React,Node.js,MongoDB)"
                                value={form.tech}
                                onChange={(e) => setForm({ ...form, tech: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <input
                                placeholder="Status (e.g. Phases 1-18 Complete)"
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <input
                                placeholder="Image path (e.g. /serenity-preview.png)"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <input
                                placeholder="Live Demo URL"
                                value={form.demoUrl}
                                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <input
                                placeholder="GitHub URL"
                                value={form.githubUrl}
                                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                            <input
                                placeholder="YouTube URL"
                                value={form.youtubeUrl}
                                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                        >
                            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                            {editingId ? "Save Changes" : "Add Project"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}