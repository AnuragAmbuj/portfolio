"use client";

import { motion } from "framer-motion";

export default function AtticHeader() {

    return (
        <div className="mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6 flex items-center flex-wrap gap-4"
            >
                <div>The <span className="text-gradient">Attic</span></div>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    Coming Soon
                </span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
                Dusty corners of engineering where we rebuild complex systems from scratch. 
                Here students learn how to build these systems end-to-end in a language of their choice.
                No libraries, no shortcuts—just raw implementation.
            </motion.p>
            
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary w-fit text-sm font-medium"
            >
                <span>Premium Access</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>Per Project Pricing</span>
            </motion.div>
        </div>
    );
}
