"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import styles from "./Contact.module.css";

export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for form submission logic
        alert("Thanks for reaching out! This is a demo form.");
    };

    return (
        <section className={styles.section}>
            <div className={styles.blob} />
            <div className={styles.container}>
                <motion.div
                    className={`${styles.card} glass`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.header}>
                        <motion.h1
                            className={styles.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Get in <span className="text-gradient">Touch</span>
                        </motion.h1>
                        <motion.p
                            className={styles.subtitle}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Have a project in mind or just want to say hi?
                        </motion.p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <input
                                type="text"
                                id="name"
                                className={styles.input}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.input}
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Message</label>
                            <textarea
                                id="message"
                                className={styles.textarea}
                                placeholder="Tell me about your project..."
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
