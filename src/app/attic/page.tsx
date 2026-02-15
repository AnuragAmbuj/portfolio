import { challengeRepository } from "@/services/attic";
import ChallengeGrid from "@/components/attic/ChallengeGrid";
import AtticHeader from "@/components/attic/AtticHeader";

export default async function AtticPage() {
    const challenges = await challengeRepository.getAll();

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <AtticHeader />
            <ChallengeGrid challenges={challenges} />
        </main>
    );
}
