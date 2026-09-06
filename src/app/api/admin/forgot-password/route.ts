import { NextResponse } from "next/server";
import { db } from "@/db";
import { passwordResetOtps } from "@/db/schema";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await db.insert(passwordResetOtps).values({ email, otp, expiresAt });

        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY!,
            },
            body: JSON.stringify({
                sender: { name: "rifat-dev Admin", email: "rifatrashedulislam148@gmail.com" },
                to: [{ email }],
                subject: "Your Admin Password Reset Code",
                htmlContent: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`,
            }),
        });

        if (!brevoRes.ok) {
            const errText = await brevoRes.text();
            console.error("Brevo error:", errText);
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}