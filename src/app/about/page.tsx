"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Briefcase, Award, BookOpen, Code2, CheckCircle2 } from "lucide-react";
import styles from "./about.module.css";

export default function AboutPage() {
    const [currentFrame, setCurrentFrame] = useState(0);
    const profileImages = [
        "/profile-cartoon-1.png", // Neutral
        "/profile-cartoon-2.png", // Smile
        "/profile-cartoon-3.png", // Laugh
        "/profile-cartoon-2.png", // Smile (cycle back)
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % profileImages.length);
        }, 200); // Change frame every 200ms

        return () => clearInterval(interval);
    }, [profileImages.length]);

    const projects = [
        {
            title: "Vehicle Telematics and Data Pipeline (Blusmart)",
            role: "Team Lead & Architect",
            points: [
                "Led entire Hub and Fleet Tech, actively managing, reviewing code and mentoring a full-stack team of motivated engineers.",
                "Developed a Charging recommendation platform using telematics data to increase EV battery longevity and reduce unexpected battery costs.",
                "Proposed and Architected a streaming data replication pipeline used by the Data Analysts and the DBAs, worked with DevOps for service scalability & resource optimisation.",
                "JVM performance improvements, migration from HotSpot to OpenJ9, 50%-70% reduced cloud cost for the same overall throughput.",
                "System-based Charging Recommendations using Vehicle Telemetry.",
                "Dynamic remote configuration management with Secrets across the entire codebase, with a huge impact with regards to compliance and cyber security.",
                "Online Transaction Ledger and Online receipt collection through application instead of manual cash transfers, removing manual cash management at Hubs.",
                "Tech Stack: Java, Spring Boot, Kafka, MySQL, Redis, Mongo, Go, Gin"
            ]
        },
        {
            title: "Postpe, Credit Card Bill Payment",
            role: "SDE 3",
            points: [
                "Implemented an audited rule-based system to enable the charging of convenience fees on QR and Card transactions.",
                "Implemented offers system that gathers data from various sources and runs rule-based analysis to determine the offers to be shown to the user.",
                "End to End Design and Implementation of Card Tokenization for CCBP, a compliance requirement.",
                "Tech Stack: Java, Spring MVC, Spring-Data JPA, MySQL, Mongo, Redis"
            ]
        },
        {
            title: "Shop on EMI, Loan Repayment (Mobikwik)",
            role: "SDE 2",
            points: [
                "Implemented SOE repayment feature for Delinquent and Non-Delinquent customers.",
                "Enabled customers to repay Loan EMIs through the Mobikwik app, leading to multifold increase in repayments.",
                "End-to-end ownership of LMS (Lending Management System).",
                "Introduced the practice of writing unit test cases in backend services.",
                "More than 35% increase in customer’s self-repayments of loan.",
                "Tech Stack: Java, Spring MVC, Spring-Data JPA, MySQL, Redis"
            ]
        },
        {
            title: "Merchant Subscription and Insurance Services (Freecharge)",
            role: "Lead SDE",
            points: [
                "Contributed to a Subscription platform for the monetization of value-added services like Khata, Insurance, etc.",
                "Contributed to a generic and flexible subscription platform.",
                "Participation in product conceptualization and roadmap.",
                "Tech Stack: Java, Spring Boot, Spring-Data JPA, MySQL"
            ]
        },
        {
            title: "UPI, MPAN, and Bharat QR (Freecharge)",
            role: "Lead SDE",
            points: [
                "Implemented a system to enable UPI-based payments on Bharat QR issued by Freecharge.",
                "Implementation of Card transactions over Bharat QR with Razorpay as an aggregator.",
                "Merchant Onboarding Platform end-to-end, integrating of Bharat QR and UPI, along with other payment modes, 5X increase in merchant transactions."
            ]
        }
    ];

    const courses = [
        { name: "Domain Driven Design on LinkedIn", date: "Sep 2025" },
        { name: "Prompt Engineering on Coursera", date: "Nov 2025" },
        { name: "Service-Oriented Architecture on Coursera", date: "Dec 2020" },
        { name: "Java Memory Management at Udemy", date: "Feb 2020" },
        { name: "Concurrent, Parallel, and Distributed Programming", date: "Feb 2020" }
    ];

    return (
        <main className={styles.container}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src={profileImages[currentFrame]}
                        alt="Anurag Ambuj"
                        fill
                        className={styles.profileImage}
                        priority
                    />
                </div>
                <h1 className={styles.title}>Anurag Ambuj</h1>
                <p className={styles.subtitle}>
                    Experienced software engineer with expertise in software development, team leadership,
                    driving innovative projects to high-precision delivery.
                </p>
                <div className={styles.actions}>
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

            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <h2 className={styles.sectionTitle}>
                    <Award size={24} className="text-primary" />
                    Experience Summary & Strengths
                </h2>
                <div className={styles.card}>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                            Close to 10 years of experience in the development of distributed backend systems.
                        </li>
                        <li className={styles.listItem}>
                            <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                            Experience in advanced system design and building highly complex systems from the ground up for various domains.
                        </li>
                        <li className={styles.listItem}>
                            <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                            Enjoys responsibilities, Team Leader, Deep experience in building systems end-to-end.
                        </li>
                    </ul>
                </div>
            </motion.section>

            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <h2 className={styles.sectionTitle}>
                    <Code2 size={24} className="text-primary" />
                    Technical Skills
                </h2>
                <div className={styles.card}>
                    <div className={styles.skillsGrid}>
                        <div>
                            <div className={styles.skillCategory}>Programming</div>
                            <div className={styles.skillList}>Java, Go</div>
                        </div>
                        <div>
                            <div className={styles.skillCategory}>Frameworks & Cloud</div>
                            <div className={styles.skillList}>Spring Boot, Spring Data JPA, MyBatis, Gin, Gorm, AWS</div>
                        </div>
                        <div>
                            <div className={styles.skillCategory}>Databases & Messaging</div>
                            <div className={styles.skillList}>MySQL, MongoDB, Redis, Elasticsearch, Kafka</div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <h2 className={styles.sectionTitle}>
                    <Briefcase size={24} className="text-primary" />
                    Detailed Project Experience
                </h2>
                {projects.map((project) => (
                    <div key={project.title} className={styles.card}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        {project.role && <div className={styles.projectRole}>{project.role}</div>}
                        <ul className={styles.list}>
                            {project.points.map((point) => (
                                <li key={point} className={styles.listItem}>
                                    <span className={styles.bullet} />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.section>

            <motion.section
                className={styles.section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <h2 className={styles.sectionTitle}>
                    <BookOpen size={24} className="text-primary" />
                    Education & Certifications
                </h2>
                <div className={styles.card}>
                    {courses.map((course) => (
                        <div key={course.name} className={styles.courseItem}>
                            <span className={styles.courseName}>{course.name}</span>
                            <span className={styles.courseDate}>{course.date}</span>
                        </div>
                    ))}
                </div>
            </motion.section>
        </main >
    );
}
