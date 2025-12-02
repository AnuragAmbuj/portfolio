"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.blob} />
            <div className={`container ${styles.container}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.content}
                >
                    <motion.span
                        className={styles.greeting}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Hello, I&apos;m
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Anurag <span className="text-gradient">Ambuj</span>
                    </motion.h1>

                    <motion.h2
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Software Engineering Expert <br />
                        Java, Go, Rust & Zig
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Close to a decade of experience in building robust, scalable backend systems.
                        Specializing in domain-driven architectures, distributed systems, and solving real-world problems at scale.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="#projects" className={styles.primaryBtn}>
                            View Work <ArrowRight size={20} />
                        </Link>
                        <Link href="/blog" className={styles.secondaryBtn}>
                            Read Blog
                        </Link>
                    </motion.div>

                    <motion.div
                        className={styles.socials}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <a href="https://github.com/anuragambuj" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GithubIcon size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/anurag-ambuj-75b773b6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedinIcon size={24} />
                        </a>
                        <a href="mailto:anuragambuj@gmail.com" aria-label="Email">
                            <Mail size={24} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
