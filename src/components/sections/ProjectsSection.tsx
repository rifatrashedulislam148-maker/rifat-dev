"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";

interface Project {
    title: string;
    description: string;
    tech: string[];
    status?: string;
    image?: string;
    demoUrl?: string;
    githubUrl?: string;
    youtubeUrl?: string;
}

const projects: Project[] = [
    {
        title: "Serenity Resort",
        description:
            "A full-stack resort management platform covering bookings, payments, and guest experience end to end. Built with real-world architecture: Firebase authentication, Stripe payment processing, a Gemini-powered AI concierge chatbot ('Lunavia'), and a simulated blockchain-style audit trail for payment integrity.",
        tech: [
            "React",
            "Vite",
            "Node.js",
            "Express",
            "MongoDB",
            "Firebase Auth",
            "Stripe",
            "Gemini AI",
            "Brevo",
        ],
        status: "Phases 1-18 Complete",
        image: "/serenity-preview.png",
        demoUrl: "https://serenity-resort-ten.vercel.app/",
        githubUrl: "https://github.com/rifatrashedulislam148-maker/serenity-resort",
    },
];

function BrowserMockup({ image, title }: { image: string; title: string }) {
    return (
        <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-purple-500/20 to-blue-400/20 blur-xl" />
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0a14]">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <div className="relative aspect-video w-full">
                    <Image src={image} alt={title} fill className="object-cover object-top" />
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const hasDemo = Boolean(project.demoUrl);
    const hasGithub = Boolean(project.githubUrl);
    const hasYoutube = Boolean(project.youtubeUrl);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
        >
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-purple-400 to-blue-400" />

            {project.image && (
                <div className="mb-6">
                    <BrowserMockup image={project.image} title={project.title} />
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3>
                {project.status && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                        {project.status}
                    </span>
                )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-muted-foreground">
                        {t}
                    </span>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                {hasDemo && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"><ExternalLink className="h-4 w-4" />Visit Live Site</a>}
                {hasGithub && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium transition-colors hover:border-white/25"><SiGithub className="h-4 w-4" />GitHub</a>}
                {hasYoutube && <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium transition-colors hover:border-white/25"><SiYoutube className="h-4 w-4" />Watch Demo</a>}
            </div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    return (
        <section id="projects" className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-24">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
                Portfolio
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
                Featured Project
            </motion.h2>

            <div className="flex w-full flex-col gap-6">
                {projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}