"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import styles from "./about.module.css";

export default function AboutPage() {
    const [portraitLoaded, setPortraitLoaded] = useState(false);

    const experiences = [
        {
            company: "Applied Materials",
            role: "Software Engineering Expert",
            period: "Jun 2025 - Present",
            logo: "/companies/Applied_Materials/Applied_Materials.svg",
            description: "Designing software architectures for semiconductor manufacturing.",
            projects: [
                {
                    name: "Domain Architecture",
                    desc: "Designing domain-driven architectures."
                },
                {
                    name: "Manufacturing Software",
                    desc: "Developing software solutions for advanced semiconductor manufacturing."
                }
            ]
        },
        {
            company: "BluSmart Mobility",
            role: "Team Lead - Engineering",
            period: "Oct 2022 - May 2025",
            logo: "/companies/Blusmart.png",
            description: "Led the backend engineering team for the ride-hailing platform.",
            projects: [
                {
                    name: "Hub & Fleet Tech",
                    desc: "Led the developer team for Hub and Fleet technology."
                },
                {
                    name: "Charging Platform",
                    desc: "Built the charging recommendation platform for fleet optimization."
                },
                {
                    name: "Data Pipeline",
                    desc: "Architected streaming data pipelines for vehicle telemetry."
                },
                {
                    name: "Optimization",
                    desc: "Optimized JVM performance, reducing infrastructure costs by 50%."
                },
                {
                    name: "Config System",
                    desc: "Implemented a dynamic remote configuration system."
                }
            ]
        },
        {
            company: "BharatPe",
            role: "SDE 3",
            period: "Apr 2022 - Oct 2022",
            logo: "/companies/BharatPe/BharatPe_idcm_6aijV_0.svg",
            description: "Developed lending and bill payment systems.",
            projects: [
                {
                    name: "Convenience Fees",
                    desc: "Implemented the rule-engine for convenience fees."
                },
                {
                    name: "Offers System",
                    desc: "Implemented the system for managing user offers."
                },
                {
                    name: "Tokenization",
                    desc: "Designed and implemented card tokenization."
                }
            ]
        },
        {
            company: "Mobikwik",
            role: "SDE 2",
            period: "Jun 2021 - Mar 2022",
            logo: "/companies/mobikwik.png",
            description: "Built Lending Management System and repayment solutions.",
            projects: [
                {
                    name: "Loan Repayments",
                    desc: "Developed loan repayment features."
                },
                {
                    name: "LMS Ownership",
                    desc: "Owned the Lending Management System components."
                },
                {
                    name: "Unit Testing",
                    desc: "Adopted and standardized unit testing practices."
                }
            ]
        },
        {
            company: "Freecharge",
            role: "Lead SDE",
            period: "Aug 2018 - Mar 2021",
            logo: "/companies/Freecharge.jpeg",
            description: "Developed merchant and subscription solutions.",
            projects: [
                {
                    name: "Subscriptions",
                    desc: "Built the subscription monetization platform."
                },
                {
                    name: "Merchant Onboarding",
                    desc: "Streamlined the documentation and integration process for merchants."
                },
                 {
                    name: "System Scalability",
                    desc: "Enhanced system architecture to handle peak transaction volumes."
                },
                {
                    name: "Product Roadmap",
                    desc: "Participated in product roadmap planning."
                }
            ]
        },
         {
            company: "Envestnet | Yodlee",
            role: "Software Engineer",
            period: "Jul 2016 - Aug 2018",
            logo: "/companies/Yodlee.jpeg",
            description: "Worked on financial data aggregation.",
            projects: [
                {
                    name: "Data Aggregation",
                    desc: "Developed financial data aggregation platforms."
                },
                {
                    name: "Data Pipelines",
                    desc: "Optimized data processing pipelines."
                }
            ]
        }
    ];

    const courses = [
        { name: "Domain Driven Design", date: "2025" },
        { name: "Prompt Engineering", date: "2025" },
        { name: "Service-Oriented Arch", date: "2020" },
        { name: "Java Memory Mgmt", date: "2020" }
    ];



    const skills: Record<string, string[]> = {
        Languages: ["Java", "Go", "Rust", "Zig", "Kotlin", "TypeScript", "SQL"],
        "Core Competencies": ["Distributed Systems", "Microservices", "Domain Driven Design", "Event Sourcing", "System Design"],
        "Technologies & Tools": ["Spring Boot", "Kafka", "AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"]
    };

    const stats = [
        { value: "10+", label: "Years of Experience" },
        { value: "500M+", label: "Requests/Day Scaled" },
        { value: "4", label: "Product Domains Shipped" }
    ];

    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.portrait}>
                    <Image src="/profile-2d-2.png" alt="Portrait of Anurag Ambuj" fill sizes="(min-width: 768px) 240px, 160px" className={styles.portraitImage} priority />
                </div>
                <div>
                    <p className={styles.eyebrow}>About</p>
                    <h1 className={styles.headline}>Systems that hold under pressure</h1>
                    <p className={styles.lede}>
                        I am Anurag Ambuj, a software engineering expert with over a decade of experience architecting high-performance distributed systems. I have scaled backend infrastructure for FinTech and Mobility unicorns, and now design software for semiconductor manufacturing.
                    </p>
                    <div className={styles.ctaRow}>
                        <a href="/Anurag_Ambuj_Resume.pdf" className={styles.primaryBtn} target="_blank" rel="noopener noreferrer" download="Anurag_Ambuj_Resume.pdf">
                            <Download size={18} /> Download Resume
                        </a>
                        <a href="/projects" className={styles.secondaryBtn}>
                            See my work <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.statBand} aria-label="Career at a glance">
                {stats.map((s) => (
                    <div key={s.label}>
                        <div className={styles.statValue}>{s.value}</div>
                        <div className={styles.statLabel}>{s.label}</div>
                    </div>
                ))}
            </section>

            <section className={styles.split}>
                <div>
                    <h2 className={styles.sectionHeading}>The short version</h2>
                    <p className={styles.bodyText}>
                        Since 2016 I have built the money-moving side of software: data aggregation at Envestnet | Yodlee, merchant subscriptions at Freecharge, lending and card tokenization at Mobikwik and BharatPe, then ride-hailing and charging infrastructure at BluSmart. Today I apply the same discipline to semiconductor manufacturing software at Applied Materials.
                    </p>
                    <p className={styles.bodyText}>
                        The throughline: systems that stay correct at peak load, owned end to end, from domain model to deployment.
                    </p>
                </div>
                <div>
                    <h2 className={styles.sectionHeading}>The toolkit</h2>
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className={styles.skillGroup}>
                            <div className={styles.skillCategory}>{category}</div>
                            <div className={styles.skillList}>
                                {items.map((s) => (
                                    <span key={s} className={styles.skillTag}>{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.timeline}>
                <h2 className={styles.sectionHeading}>Where I have worked</h2>
                {experiences.map((exp) => (
                    <article key={exp.company} className={styles.entry}>
                        <div className={styles.entryMeta}>
                            {exp.logo && (
                                <div className={styles.logoWrapper}>
                                    <Image src={exp.logo} alt={exp.company + " logo"} fill sizes="40px" className={styles.companyLogo} />
                                </div>
                            )}
                            <div>
                                <span className={styles.period}>{exp.period}</span>
                                <span className={styles.periodDesktop}>{exp.period}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className={styles.role}>{exp.role}</h3>
                            <div className={styles.company}>{exp.company}</div>
                            <p className={styles.entryDesc}>{exp.description}</p>
                            <div className={styles.projectGrid}>
                                {exp.projects.map((p) => (
                                    <div key={p.name} className={styles.subProjectCard}>
                                        <h4 className={styles.subProjectTitle}>{p.name}</h4>
                                        <p className={styles.subProjectDesc}>{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <section className={styles.courses}>
                <h2 className={styles.sectionHeading}>Always learning</h2>
                <div className={styles.courseList}>
                    {courses.map((c) => (
                        <span key={c.name} className={styles.courseChip}>
                            {c.name} <strong>{c.date}</strong>
                        </span>
                    ))}
                </div>
            </section>
        </main>
    );
}
