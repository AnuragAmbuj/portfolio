"use client";

import { format } from "date-fns";
import { Mail, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    read: boolean;
};

export default function MessageList({ messages }: { messages: Message[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (messages.length === 0) {
        return (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4 bg-card rounded-xl border border-border">
                <Mail size={48} className="opacity-20" />
                <p>No messages yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="divide-y divide-border">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        onClick={() => toggleExpand(msg.id)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleExpand(msg.id);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        className={`group p-4 transition-all cursor-pointer hover:bg-muted/50 ${expandedId === msg.id ? "bg-muted/30" : ""
                            }`}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mt-1">
                                {msg.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Content */}
                            <div className="flex-grow min-w-0 grid gap-1">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className={`font-medium truncate ${expandedId === msg.id ? "text-primary" : "text-foreground"}`}>
                                        {msg.subject}
                                    </h3>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                                        <Calendar size={12} />
                                        {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground/80">{msg.name}</span>
                                    <span className="text-muted-foreground/60">&lt;{msg.email}&gt;</span>
                                </div>

                                {/* Preview / Full Message */}
                                <div className="text-sm text-muted-foreground mt-1">
                                    {expandedId === msg.id ? (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="whitespace-pre-wrap text-foreground"
                                        >
                                            {msg.message}
                                        </motion.div>
                                    ) : (
                                        <p className="truncate pr-4">{msg.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Chevron */}
                            <div className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors mt-1">
                                {expandedId === msg.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
