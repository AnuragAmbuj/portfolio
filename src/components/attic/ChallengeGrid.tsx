"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Challenge } from "@/services/attic/types";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

interface ChallengeGridProps {
    readonly challenges: Challenge[];
}

export default function ChallengeGrid({ challenges }: ChallengeGridProps) {
    const getDifficultyColor = (difficulty: string) => {
        if (difficulty === 'Expert') return 'bg-red-500/10 text-red-500';
        if (difficulty === 'Hard') return 'bg-orange-500/10 text-orange-500';
        return 'bg-blue-500/10 text-blue-500';
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {challenges.map((challenge) => (
                <motion.div 
                    key={challenge.id}
                    variants={itemVariants}
                    className="group relative bg-card hover:bg-muted/50 border border-border rounded-xl p-8 transition-colors duration-300"
                >
                    <div className="mb-6 p-3 bg-background rounded-lg w-fit border border-border shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {challenge.icon}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {challenge.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {challenge.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        {challenge.description}
                    </p>

                    <Link 
                        href={`/attic/${challenge.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all duration-300"
                    >
                        View Roadmap <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>

                    <div className="absolute top-8 right-8">
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${getDifficultyColor(challenge.difficulty)}`}>
                                {challenge.difficulty}
                            </span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
