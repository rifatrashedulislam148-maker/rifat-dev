import { NextResponse } from "next/server";
import { db } from "@/db";
import { passwordResetOtps } from "@/db/schema";
import { adminAuth } from "@/lib/firebase-admin";
import { eq, and, gt } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const { email, otp, newPassword } = await request.json();

        if (!email || !otp || !newPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const [validOtp] = await db
            .select()
            .from(passwordResetOtps)
            .where(
                and(
                    eq(passwordResetOtps.email, email),
                    eq(passwordResetOtps.otp, otp),
                    eq(passwordResetOtps.used, false),
                    gt(passwordResetOtps.expiresAt, new Date())
                )
            );

        if (!validOtp) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        const user = await adminAuth.getUserByEmail(email);
        await adminAuth.updateUser(user.uid, { password: newPassword });

        await db
            .update(passwordResetOtps)
            .set({ used: true })
            .where(eq(passwordResetOtps.id, validOtp.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}