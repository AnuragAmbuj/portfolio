"use client";

import { motion } from "framer-motion";
import { Challenge } from "@/services/attic/types";

interface ChallengeDetailProps {
    readonly challenge: Challenge;
}

export default function ChallengeDetail({ challenge }: ChallengeDetailProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex gap-3 mb-6">
                {challenge.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {tag}
                    </span>
                ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{challenge.title}</h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                {challenge.fullDescription}
            </p>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-8">Implementation Roadmap</h2>
                
                <div className="relative border-l-2 border-border ml-3 pl-8 pb-12 space-y-12">
                    {challenge.steps.map((step, index) => (
                        <motion.div 
                            key={step.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            <span className="absolute -left-[41px] top-0 bg-background p-1">
                                <div className="w-4 h-4 rounded-full border-2 border-primary bg-background" />
                            </span>
                            
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                <span className="text-muted-foreground font-mono text-sm opacity-50 mr-2">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-16 bg-muted/30 border border-border rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Module Status: Upcoming</h3>
                <p className="text-muted-foreground mb-6">
                    The interactive modules for this challenge are currently being finalized.
                </p>
                <button disabled className="bg-primary/50 cursor-not-allowed text-primary-foreground px-8 py-3 rounded-lg font-semibold">
                    Enrollment Opening Soon
                </button>
                <p className="text-xs text-muted-foreground mt-4 italic">
                    (Detailed coursework and verification systems are in development)
                </p>
            </div>
        </motion.div>
    );
}
