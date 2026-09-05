"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, BookOpen, Microscope, GraduationCap } from "lucide-react";

const pillars = [
    {
        icon: Code2,
        title: "Build",
        description:
            "Full-stack applications, desktop software, database systems, and interactive web experiences.",
    },
    {
        icon: BookOpen,
        title: "Learn",
        description:
            "Continuously learning computer science, data science, AI, and modern development technologies.",
    },
    {
        icon: Microscope,
        title: "Research",
        description:
            "Exploring AI, machine learning, data science, software engineering, and emerging technologies.",
    },
    {
        icon: GraduationCap,
        title: "Share",
        description:
            "Sharing knowledge through teaching, mentoring, notes, projects, resources, and technical content.",
    },
];

function TiltImage() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
        stiffness: 150,
        damping: 15,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
        stiffness: 150,
        damping: 15,
    });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <div className="relative shrink-0">
            <div className="absolute -inset-4 animate-[spin_6s_linear_infinite] rounded-[2rem] bg-[conic-gradient(from_0deg,#7f77dd,#5eb1ef,#7f77dd)] opacity-70 blur-md" />
            <div className="absolute -inset-3 rounded-3xl bg-linear-to-br from-purple-500/30 to-blue-400/30 blur-2xl" />
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ rotateX, rotateY, transformPerspective: 800 }}
                className="relative h-64 w-64 overflow-hidden rounded-3xl border border-white/10 sm:h-80 sm:w-80"
            >
                <Image
                    src="/profile.png"
                    alt="Rashedul Islam Rifat"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    );
}

export default function AboutMe() {
    return (
        <section
            id="about"
            className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 overflow-hidden px-6 py-24"
        >
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

            <div className="relative flex w-full flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
                <TiltImage />

                <div className="max-w-xl text-center md:text-left">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        About Me
                    </p>
                    <h2 className="bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                        Hi, I&apos;m Rifat
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        A Computer Science and Engineering student passionate about
                        full-stack development, AI, and research — turning ideas into
                        practical, real-world solutions. This portfolio documents that
                        journey.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground">
                            CSE Student, SEU
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground">
                            Founder, Serenity Resort
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {pillars.map((pillar, i) => {
                    const Icon = pillar.icon;
                    return (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-purple-300/30"
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-purple-400 to-blue-400" />
                            <Icon className="h-7 w-7 text-purple-300 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {pillar.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}