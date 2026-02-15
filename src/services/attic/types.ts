import { ReactNode } from "react";

export type ChallengeDifficulty = "Medium" | "Hard" | "Expert";

export interface ChallengeStep {
    title: string;
    description: string;
}

export interface Challenge {
    id: string;
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    icon: ReactNode;
    difficulty: ChallengeDifficulty;
    tags: string[];
    steps: ChallengeStep[];
}
