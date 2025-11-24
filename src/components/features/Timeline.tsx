"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import styles from "./Timeline.module.css";

const experiences = [
    {
        role: "Software Engineering Expert",
        company: "Applied Materials",
        period: "Jun 2025 - Present",
        description: "Building robust, scalable backend systems. Specializing in Java, Go, Rust, and Zig. Designing domain-driven and distributed architectures.",
    },
    {
        role: "Team Lead",
        company: "BluSmart Mobility",
        period: "Oct 2022 - Apr 2024",
        description: "Led the backend team for the all-electric ride-hailing platform. Architected core services and managed team delivery.",
    },
    {
        role: "SDE 3",
        company: "BharatPe",
        period: "Apr 2022 - Oct 2022",
        description: "Developed high-performance payment processing systems. Contributed to the growth of the merchant lending platform.",
    },
    {
        role: "SDE 2",
        company: "Mobikwik",
        period: "Jun 2021 - Mar 2022",
        description: "Worked on digital wallet and payment gateway integrations. Optimized transaction processing pipelines.",
    },
    {
        role: "Lead SDE",
        company: "Freecharge",
        period: "Aug 2018 - Mar 2021",
        description: "Led development of key features for the digital payments platform. Mentored junior developers and improved code quality.",
    },
    {
        role: "Software Engineer",
        company: "Envestnet | Yodlee",
        period: "Jul 2016 - Aug 2018",
        description: "Worked on financial data aggregation and analytics platforms. Optimized high-volume data processing pipelines.",
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
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={styles.dot}>
                                <Briefcase size={16} />
                            </div>

                            <div className={`${styles.content} glass`}>
                                <span className={styles.period}>{exp.period}</span>
                                <h3 className={styles.role}>{exp.role}</h3>
                                <h4 className={styles.company}>{exp.company}</h4>
                                <p className={styles.description}>{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
