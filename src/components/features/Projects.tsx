"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import styles from "./Projects.module.css";

const projects = [
    {
        title: "ziggydb",
        description: "A transaction KV database in the works, built with Zig.",
        tags: ["Zig", "Database", "Systems"],
        demoUrl: "https://github.com/anuragambuj/ziggydb",
        repoUrl: "https://github.com/anuragambuj/ziggydb",
        image: "/project1.jpg", // Placeholder
    },
    {
        title: "Logan",
        description: "Kafka Broker implementation in Rust.",
        tags: ["Rust", "Kafka", "Distributed Systems"],
        demoUrl: "https://github.com/anuragambuj/Logan",
        repoUrl: "https://github.com/anuragambuj/Logan",
        image: "/project2.jpg", // Placeholder
    },
    {
        title: "forge-plugin-rover",
        description: "IntelliJ platform plugin based on forge command line tool.",
        tags: ["Kotlin", "IntelliJ", "Plugin"],
        demoUrl: "https://github.com/anuragambuj/forge-plugin-rover",
        repoUrl: "https://github.com/anuragambuj/forge-plugin-rover",
        image: "/project3.jpg", // Placeholder
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

export default function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {projects.map((project) => (
                        <motion.div key={project.title} className={`${styles.card} glass`} variants={item}>
                            <div className={styles.cardContent}>
                                <div className={styles.header}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <div className={styles.links}>
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
