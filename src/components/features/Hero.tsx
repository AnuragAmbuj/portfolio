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
                        className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-6 font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Software Engineering Expert <br/> 
                        <span className="font-medium text-slate-800 dark:text-slate-200">Java, Go, Rust & Zig</span>
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
                        <Link 
                            href="#projects" 
                            className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
                        >
                            <span className="font-medium">View Work</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
                        <a href="https://github.com/anuragambuj" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GithubIcon size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/anurag-ambuj-75b773b6/" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedinIcon size={24} />
                        </a>
                        <a href="mailto:anuragambuj@gmail.com" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" aria-label="Email">
                            <Mail size={24} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
