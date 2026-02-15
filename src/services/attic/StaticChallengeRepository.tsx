import { Challenge } from "./types";
import { MessageSquare, Database, Terminal } from "lucide-react";
import React from "react";
import { ChallengeRepository as IChallengeRepository } from "./ChallengeRepository";

// Data definition
const challenges: Challenge[] = [
    {
        id: "kafka",
        title: "Build Your Own Kafka",
        description: "Understand distributed logs, commit offsets, and consumer groups by building a message broker from scratch.",
        fullDescription: "Apache Kafka is the backbone of modern data streaming. In this challenge, you will build a distributed log-structured message broker. You'll handle TCP connections, implement a binary protocol, manage partition logs on disk, and coordinate consumer groups.",
        icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
        difficulty: "Hard",
        slug: "build-your-own-kafka",
        tags: ["Distributed Systems", "Go", "Networking"],
        steps: [
            { title: "The TCP Server", description: "Spin up a TCP server that can handle concurrent connections and decode a custom binary frame format." },
            { title: "The Write-Ahead Log", description: "Implement an append-only log structure on disk with offset indexing for fast lookups." },
            { title: "Topics & Partitions", description: "Abstract the log into Topics and Partitions, allowing logical separation of data streams." },
            { title: "Producers & Consumers", description: "Implement the API for sending messages (Produce) and reading them (Consume) starting from an offset." },
            { title: "Consumer Groups", description: "Add coordination logic to track consumption state across multiple consumers." }
        ]
    },
    {
        id: "rdbms",
        title: "Write a Relational Database System from scratch",
        description: "Implement a crossover B-Tree, buffer pool manager, and SQL parser to understand how databases persist data.",
        fullDescription: "Ever wondered how `SELECT * FROM users` actually works? We'll build a relational database engine from the ground up. You'll deal with page-based storage, B+ Tree indexing, a buffer pool manager for caching, and a simple SQL execution engine.",
        icon: <Database className="w-8 h-8 text-green-500" />,
        difficulty: "Expert",
        slug: "write-an-rdbms",
        tags: ["Storage Engines", "C++", "Algorithms"],
        steps: [
            { title: "Page Layout", description: "Define a fixed-size page structure (e.g., 4KB) for storing tuples and headers." },
            { title: "Buffer Pool Manager", description: "Implement an LRU cache to manage in-memory pages and disk I/O." },
            { title: "B+ Tree Index", description: "Build a B+ Tree for efficient range scans and point lookups on your pages." },
            { title: "SQL Parser", description: "Write a lexer and parser to convert simple SQL queries into an execution plan." },
            { title: "Query Executor", description: "Implement the iterators (SeqScan, IndexScan) to execute the plan and return rows." }
        ]
    },
    {
        id: "interpreter",
        title: "Make an Interpreter",
        description: "Craft a lexer, parser, and AST evaluator. Learn how code actually runs by building your own language.",
        fullDescription: "Stop treating your compiler like a black box. We will build an interpreter for a C-like language. You'll start with raw text, break it into tokens, build an Abstract Syntax Tree (AST), and then write an evaluator to run the code directly.",
        icon: <Terminal className="w-8 h-8 text-purple-500" />,
        difficulty: "Medium",
        slug: "make-an-interpreter",
        tags: ["Compilers", "Rust", "PL Theory"],
        steps: [
            { title: "Lexical Analysis", description: "Build a Lexer to convert source code strings into a stream of Tokens." },
            { title: "Parsing", description: "Implement a Recursive Descent Parser to verify syntax and construct an AST." },
            { title: "Evaluation", description: "Traverse the AST to evaluate expressions, handle variables, and control flow." },
            { title: "Functions & Closures", description: "Add support for first-class functions and environment scopes." },
            { title: "Garbage Collection", description: "Implement a simple Mark-and-Sweep garbage collector for memory management." }
        ]
    }
];

export class StaticChallengeRepository implements IChallengeRepository {
    async getAll(): Promise<Challenge[]> {
        // Simulate async fetching if needed, but for static it's instant
        return challenges;
    }

    async getBySlug(slug: string): Promise<Challenge | null> {
        const challenge = challenges.find(c => c.slug === slug);
        return challenge || null;
    }
}
