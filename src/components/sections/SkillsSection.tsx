"use client";

import { motion } from "framer-motion";
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiThreedotjs,
    SiFramer,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiFirebase,
    SiMysql,
    SiCplusplus,
    SiJavascript,
    SiGit,
    SiGreensock,
    SiFigma,
} from "react-icons/si";
import { Coffee, Database, Box, Server } from "lucide-react";
import SkillsCubeLoader from "@/components/three/SkillsCubeLoader";

const skillGroups = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "Three.js", icon: SiThreedotjs },
            { name: "Framer Motion", icon: SiFramer },
        ],
    },
    {
        title: "Backend & DB",
        skills: [
            { name: "Node.js", icon: SiNodedotjs },
            { name: "Express.js", icon: SiExpress },
            { name: "MongoDB", icon: SiMongodb },
            { name: "Firebase", icon: SiFirebase },
            { name: "MySQL", icon: SiMysql },
            { name: "Oracle SQL", icon: Server },
        ],
    },
    {
        title: "Languages",
        skills: [
            { name: "Java", icon: Coffee },
            { name: "C++", icon: SiCplusplus },
            { name: "JavaScript", icon: SiJavascript },
            { name: "SQL", icon: Database },
        ],
    },
    {
        title: "Tools",
        skills: [
            { name: "Git", icon: SiGit },
            { name: "GSAP", icon: SiGreensock },
            { name: "Figma", icon: SiFigma },
            { name: "OpenGL", icon: Box },
        ],
    },
];

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
                Tech Stack
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
                Skills & Technologies
            </motion.h2>

            <SkillsCubeLoader />

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {skillGroups.map((group, i) => (
                    <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -6 }}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-purple-300/30"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-purple-400 to-blue-400" />
                        <h3 className="text-lg font-semibold">{group.title}</h3>
                        <div className="mt-4 flex flex-col gap-2.5">
                            {group.skills.map(({ name, icon: Icon }) => (
                                <div
                                    key={name}
                                    className="group flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/3 px-3 py-2 transition-colors hover:border-white/15 hover:bg-white/6"
                                >
                                    <Icon className="h-4 w-4 shrink-0 text-purple-300 transition-transform group-hover:scale-110" />
                                    <span className="text-sm text-muted-foreground">{name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}