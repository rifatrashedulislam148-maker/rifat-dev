"use client";

import { useAdminAuth } from "@/lib/useAdminAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const { user, checking } = useAdminAuth();
    const router = useRouter();

    async function handleLogout() {
        await signOut(auth);
        router.push("/admin/login");
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
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Signed in as {user.email}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:border-white/25"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-purple-300/30"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                            <Briefcase className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Manage Projects</h3>
                            <p className="text-sm text-muted-foreground">
                                Add, edit, or remove portfolio projects
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}