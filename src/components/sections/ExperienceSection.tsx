"use client";

import { motion } from "framer-motion";
import { Presentation } from "lucide-react";

const experienceEntries = [
    { name: "Avash Academic Coaching", role: "Teaching Experience" },
    { name: "Srijon Academic", role: "Part-time Higher Mathematics Instructor" },
    { name: "Global Education Centre, Gazipur", role: "Teaching Experience" },
    { name: "CareTutors", role: "Online Tutoring Platform" },
    { name: "Tuition Terminal", role: "Online Tutoring Platform" },
];

const teachingSkills = [
    "SSC & HSC English",
    "Higher Mathematics",
    "English Grammar & Composition",
    "Spoken English",
    "Personalized Student Support",
    "Recorded Video Lessons",
    "Doubt-Solving Sessions",
];

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-24"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
                Experience
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
                Teaching & Mentoring
            </motion.h2>

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground"
            >
                4.5+ Years of Teaching Experience
            </motion.span>

            <div className="relative w-full">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-linear-to-b from-purple-400/50 to-blue-400/10 sm:left-8" />

                {experienceEntries.map((entry, i) => (
                    <motion.div
                        key={entry.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                        className="relative flex gap-5 pb-4 sm:gap-7"
                    >
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:h-16 sm:w-16">
                            <Presentation className="h-5 w-5 text-purple-300 sm:h-6 sm:w-6" />
                        </div>

                        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                            <h3 className="font-semibold">{entry.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {entry.role}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {teachingSkills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}