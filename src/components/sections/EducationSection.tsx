"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationEntries = [
    {
        institution: "Southeast University (SEU)",
        location: "Dhaka, Bangladesh",
        program: "B.Sc. in Computer Science and Engineering (CSE)",
        duration: "2023 — Present",
    },
    {
        institution: "Kazi Azim Uddin College",
        location: "Joydevpur, Gazipur",
        program: "Higher Secondary Certificate (HSC)",
        duration: "2022",
        grade: "GPA: A",
    },
    {
        institution: "G.K. Model High School",
        location: "Dhirashram, Gazipur",
        program: "Secondary School Certificate (SSC)",
        duration: "2020",
        grade: "GPA: A",
    },
];

export default function EducationSection() {
    return (
        <section
            id="education"
            className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-24"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
                Education
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
                Academic Background
            </motion.h2>

            <div className="relative w-full">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-linear-to-b from-purple-400/50 to-blue-400/10 sm:left-8" />

                {educationEntries.map((entry, i) => (
                    <motion.div
                        key={entry.institution}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                        className="relative flex gap-5 pb-4 sm:gap-7"
                    >
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:h-16 sm:w-16">
                            <GraduationCap className="h-5 w-5 text-purple-300 sm:h-6 sm:w-6" />
                        </div>

                        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="text-lg font-semibold">{entry.institution}</h3>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                                    {entry.duration}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {entry.location}
                            </p>
                            <p className="mt-3 text-base">{entry.program}</p>
                            {entry.grade && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {entry.grade}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}