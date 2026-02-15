import { Challenge } from "./types";

export interface ChallengeRepository {
    getAll(): Promise<Challenge[]>;
    getBySlug(slug: string): Promise<Challenge | null>;
}
