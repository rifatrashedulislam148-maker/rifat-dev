"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed");
            }

            setSuccess(true);
            setTimeout(() => router.push("/admin/login"), 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
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
                <h1 className="mb-1 text-2xl font-bold">Reset Password</h1>
                <p className="mb-6 text-sm text-muted-foreground">
                    Enter the code sent to {email || "your email"}.
                </p>

                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                    6-Digit Code
                </label>
                <input
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mb-4 w-full rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-center text-lg tracking-[0.3em] outline-none focus:border-purple-300/40"
                />

                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                    New Password
                </label>
                <div className="relative mb-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/3 py-2.5 pl-4 pr-10 text-sm outline-none focus:border-purple-300/40"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>

                {error && <p className="mb-4 mt-2 text-sm text-red-400">{error}</p>}
                {success && (
                    <p className="mb-4 mt-2 text-sm text-green-400">
                        Password reset! Redirecting to login...
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading || success}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Reset Password
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={null}>
            <ResetPasswordForm />
        </Suspense>
    );
}