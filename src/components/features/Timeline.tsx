"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Image from "next/image";
import styles from "./Timeline.module.css";

const experiences = [
    {
        role: "Software Engineering Expert",
        company: "Applied Materials",
        period: "Jun 2025 - Present",
        description: "Designing domain-driven architectures. Diving deeper into software required for advanced semiconductor manufacturing.",
        logo: "/companies/applied-materials.svg",
    },
    {
        role: "Team Lead",
        company: "BluSmart Mobility",
        period: "Oct 2022 - Apr 2024",
        description: "Led the backend team for the all-electric ride-hailing platform. Architected core services and managed team delivery. Built tech teams from scratch to support the growth.",
        logo: "/companies/blusmart.svg",
    },
    {
        role: "SDE 3",
        company: "BharatPe",
        period: "Apr 2022 - Oct 2022",
        description: "Developed high-performance lending and bill payment systems. Contributed to the growth of their lending platform.",
        logo: "/companies/bharatpe.svg",
    },
    {
        role: "SDE 2",
        company: "Mobikwik",
        period: "Jun 2021 - Mar 2022",
        description: "Built Lending Management System and robust solutions for repayments.",
        logo: "/companies/mobikwik.svg",
    },
    {
        role: "Lead SDE",
        company: "Freecharge",
        period: "Aug 2018 - Mar 2021",
        description: "Led development of key features for the digital payments platform. Delivered end-to-end solutions for Merchants.",
        logo: "/companies/freecharge.svg",
    },
    {
        role: "Software Engineer",
        company: "Envestnet | Yodlee",
        period: "Jul 2016 - Aug 2018",
        description: "Financial data aggregation and analytics platforms. Optimized high-volume data processing pipelines.",
        logo: "/companies/yodlee.svg",
    },
];

export default function Timeline() {
    return (
        <section id="experience" className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Work <span className="text-gradient">Experience</span>
                </motion.h2>

                <div className={styles.timeline}>
                    <div className={styles.line} />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={`${exp.role}-${exp.company}`}
                            className={styles.item}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.dot}>
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm" />
                                <div className="w-3 h-3 bg-primary rounded-full relative z-10" />
                            </div>

                            <div className={`${styles.content} glass !p-0 overflow-hidden group`}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div>
                                            <span className={styles.period}>{exp.period}</span>
                                            <h3 className={styles.role}>{exp.role}</h3>
                                            <h4 className={styles.company}>{exp.company}</h4>
                                        </div>
                                        <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-white/50 dark:bg-slate-800/50 p-1 ring-1 ring-slate-900/5 dark:ring-white/10">
                                            <Image 
                                                src={exp.logo} 
                                                alt={`${exp.company} Logo`}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
