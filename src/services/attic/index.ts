import { StaticChallengeRepository } from "./StaticChallengeRepository";

// Use singleton pattern for the repository
export const challengeRepository = new StaticChallengeRepository();
