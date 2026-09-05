"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const purposes = ["Internship", "Research", "Freelance", "Project", "Teaching", "General"];

export default function ContactSection() {
    const [selectedPurpose, setSelectedPurpose] = useState<string>("General");

    return (
        <section
            id="contact"
            className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
                Contact
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-2 bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
                Let&apos;s Connect
            </motion.h2>

            <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
                Whether it&apos;s an internship, a research collaboration, or just to
                say hi — I&apos;d love to hear from you.
            </p>

            <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
                onSubmit={(e) => e.preventDefault()}
            >
                <label className="mb-2 block text-xs uppercase tracking-wide text-muted-foreground">
                    I&apos;m reaching out about
                </label>
                <div className="mb-6 flex flex-wrap gap-2">
                    {purposes.map((purpose) => (
                        <button
                            key={purpose}
                            type="button"
                            onClick={() => setSelectedPurpose(purpose)}
                            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${selectedPurpose === purpose
                                    ? "border-purple-300/50 bg-linear-to-r from-purple-500/30 to-blue-500/30 text-white"
                                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/25"
                                }`}
                        >
                            {purpose}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-purple-300/40"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-purple-300/40"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                        Message
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Tell me a bit about it..."
                        className="w-full resize-none rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-purple-300/40"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    <Send className="h-4 w-4" />
                    Send Message
                </button>
            </motion.form>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="mailto:rifatrashedulislam148@gmail.com" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm transition-colors hover:border-white/25">
                    <Mail className="h-4 w-4" />
                    rifatrashedulislam148@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/rashedul-islam-rifat-aa249136b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm transition-colors hover:border-white/25">
                    <FaLinkedin className="h-4 w-4" />
                    LinkedIn
                </a>
            </div>
        </section>
    );
}