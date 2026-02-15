"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, BookOpen, Code2 } from "lucide-react";
import styles from "./about.module.css";
import MasonryGrid from "../../components/layout/MasonryGrid";

export default function AboutPage() {
    const [currentFrame, setCurrentFrame] = useState(0);
    const profileImages = [
        "/profile-2d-1.png", // Neutral
        "/profile-2d-2.png", // Smile
        "/profile-2d-3.png", // Laugh
        "/profile-2d-2.png", // Smile (cycle back)
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % profileImages.length);
        }, 200); 

        return () => clearInterval(interval);
    }, [profileImages.length]);

    const experiences = [
        {
            company: "BluSmart Mobility",
            role: "Team Lead & Architect",
            period: "Oct 2022 - Apr 2024",
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



    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };


    return (
        <main className={styles.container}>
            <MasonryGrid
                gap={24}
                breakpoints={{
                    0: 1,    // Mobile
                    768: 2,  // Tablet
                    1024: 3, // Desktop
                    1280: 3  // Large Desktop - usually 3 is wide enough, or 4 if very wide. 
                             // Let's try 3 for better density as requested.
                }}
            >
                {/* 1. Profile Tile */}
                <motion.div className={`${styles.bentoItem} ${styles.itemProfile}`} variants={itemVariants} initial="hidden" animate="visible">
                    <div className={styles.profileHeader}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={profileImages[currentFrame]}
                                alt="Anurag Ambuj"
                                fill
                                className={styles.profileImage}
                                priority
                            />
                        </div>
                        <div>
                            <h1 className={styles.title}>Anurag Ambuj</h1>
                            <p className={styles.subtitle}>
                                Software Engineering Expert with over a decade of experience architecting high-performance distributed systems. Proven track record in scaling Backend infrastructure for FinTech and Mobility unicorns, now driving software innovation in Semiconductor manufacturing.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                 <div className={styles.skillTag}>Team Leadership</div>
                                 <div className={styles.skillTag}>System Design</div>
                                 <div className={styles.skillTag}>Cloud Native</div>
                            </div>
                        </div>
                        <a
                            href="/Anurag_Ambuj_Resume.pdf"
                            className={styles.downloadBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Anurag_Ambuj_Resume.pdf"
                        >
                            <Download size={20} />
                            Download Resume
                        </a>
                    </div>
                </motion.div>

                {/* 2. Stats 1 - Years */}
                <motion.div className={`${styles.bentoItem} ${styles.itemStats}`} variants={itemVariants} initial="hidden" animate="visible">
                    <div>
                        <div className="text-4xl font-bold text-primary">10+</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Years of Experience</div>
                    </div>
                 </motion.div>

                 {/* 3. Tech Stack */}
                <motion.div className={`${styles.bentoItem} ${styles.itemSkills}`} variants={itemVariants} initial="hidden" animate="visible">
                    <h2 className={styles.sectionTitle}>
                        <Code2 size={20} /> Technical Stack
                    </h2>
                    <div className={styles.skillsGrid}>
                         {/* Languages */}
                         <div className={styles.skillCategory}>Languages</div>
                         <div className={styles.skillList}>
                            {["Java", "Go", "Rust", "Zig", "Kotlin", "TypeScript", "SQL"].map(s => (
                                <span key={s} className={styles.skillTag}>{s}</span>
                            ))}
                         </div>
                         
                         {/* Architect/Core Skills */}
                         <div className={styles.skillCategory}>Core Competencies</div>
                         <div className={styles.skillList}>
                            {["Distributed Systems", "Microservices", "Domain Driven Design", "Event Sourcing", "System Design"].map(s => (
                                <span key={s} className={styles.skillTag}>{s}</span>
                            ))}
                         </div>

                         {/* Tools & Frameworks */}
                         <div className={styles.skillCategory}>Technologies & Tools</div>
                         <div className={styles.skillList}>
                            {["Spring Boot", "Kafka", "AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"].map(s => (
                                <span key={s} className={styles.skillTag}>{s}</span>
                            ))}
                         </div>
                    </div>
                </motion.div>

                 {/* 4. Stats 2 - Requests */}
                 <motion.div className={`${styles.bentoItem} ${styles.itemStats}`} variants={itemVariants} initial="hidden" animate="visible">
                    <div>
                        <div className="text-4xl font-bold text-secondary">500M+</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Requests/Day Scaled</div>
                    </div>
                 </motion.div>

                 {/* 5. Courses */}
                <motion.div className={`${styles.bentoItem} ${styles.itemEducation}`} variants={itemVariants} initial="hidden" animate="visible">
                     <h2 className={styles.sectionTitle}>
                        <BookOpen size={20} /> Courses
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {courses.map((c) => (
                            <div key={c.name} className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary border border-primary/20">
                                {c.name}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 6. Experiences (Mapped) */}
                {experiences.map((exp) => (
                    <motion.div 
                        key={exp.company} 
                        className={`${styles.bentoItem} ${styles.itemProject}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                         <div className="flex justify-between items-start mb-4 border-b border-border pb-3">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={styles.timelineBadge}>{exp.period}</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground leading-tight">{exp.role}</h3>
                                <div className="text-sm font-medium text-primary mt-1 opacity-90">{exp.company}</div>
                            </div>
                            {exp.logo && (
                                <div className={styles.logoWrapper}>
                                    <Image 
                                        src={exp.logo} 
                                        alt={exp.company} 
                                        fill 
                                        className={styles.companyLogo} 
                                    />
                                </div>
                            )}
                         </div>
                         
                         <p className="text-sm text-muted-foreground mb-4 italic">
                             {exp.description}
                         </p>

                         <div className={styles.projectGrid}>
                            {exp.projects.map((p) => ( 
                                <div key={p.name} className={styles.subProjectCard}>
                                    <h4 className={styles.subProjectTitle}>{p.name}</h4>
                                    <p className={styles.subProjectDesc}>{p.desc}</p>
                                </div>
                            ))}
                         </div>
                    </motion.div>
                ))}

            </MasonryGrid>
        </main>
    );
}
