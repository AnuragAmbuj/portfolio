"use client";

import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [messageLength, setMessageLength] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to send message");
            }

            setStatus("success");
            (e.target as HTMLFormElement).reset();
            setMessageLength(0);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
        }
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageLength(e.target.value.length);
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
                                name="name"
                                className={styles.input}
                                placeholder="John Doe"
                                required
                                disabled={status === "loading"}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                placeholder="john@example.com"
                                required
                                disabled={status === "loading"}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="subject" className={styles.label}>Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className={styles.input}
                                placeholder="Project Inquiry"
                                required
                                disabled={status === "loading"}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="message" className={styles.label}>Message</label>
                                <span className={`text-xs ${messageLength >= 255 ? "text-red-500" : "text-white/50"}`}>
                                    {messageLength}/255
                                </span>
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                placeholder="Tell me about your project..."
                                required
                                disabled={status === "loading"}
                                maxLength={255}
                                onChange={handleMessageChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={status === "loading" || status === "success"}
                        >
                            {status === "loading" ? (
                                <>Sending... <Loader2 className="animate-spin" size={18} /></>
                            ) : status === "success" ? (
                                <>Sent! <CheckCircle size={18} /></>
                            ) : status === "error" ? (
                                <>Retry <XCircle size={18} /></>
                            ) : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                        {status === "error" && (
                            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                        )}
                        {status === "success" && (
                            <p className="text-green-500 text-sm mt-2 text-center">Message sent successfully!</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
