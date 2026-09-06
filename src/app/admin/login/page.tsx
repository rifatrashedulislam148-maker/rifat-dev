"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
                <h1 className="mb-1 text-2xl font-bold">Admin Login</h1>
                <p className="mb-6 text-sm text-muted-foreground">
                    Sign in to manage your portfolio.
                </p>

                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 w-full rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none focus:border-purple-300/40"
                />

                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-6 w-full rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none focus:border-purple-300/40"
                />

                {error && (
                    <p className="mb-4 text-sm text-red-400">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Sign In
                </button>
            </form>
        </div>
    );
}