"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error();

            router.push(`/admin/reset-password?email=${encodeURIComponent(email)}`);
        } catch {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
                <h1 className="mb-1 text-2xl font-bold">Forgot Password</h1>
                <p className="mb-6 text-sm text-muted-foreground">
                    We&apos;ll send a 6-digit code to your email.
                </p>

                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                    Email
                </label>
                <div className="relative mb-4">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/3 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-purple-300/40"
                    />
                </div>

                {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Send Code
                </button>

                <Link
                    href="/admin/login"
                    className="mt-4 block text-center text-xs text-muted-foreground hover:text-white"
                >
                    Back to login
                </Link>
            </form>
        </div>
    );
}