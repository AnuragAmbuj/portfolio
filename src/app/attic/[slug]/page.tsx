import { challengeRepository } from "@/services/attic";
import ChallengeDetail from "@/components/attic/ChallengeDetail";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ChallengePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const challenge = await challengeRepository.getBySlug(params.slug);

    if (!challenge) {
        return notFound();
    }

    // Detail component has the animations and content. 
    // We can just pass the challenge. 
    // The "Back to Attic" link was in the previous page.tsx implementation? 
    // Let's check ChallengeDetail.tsx. 
    // ChallengeDetail.tsx I wrote starts with `<motion.div ...>`.
    // It does NOT have the back link.
    // So I should put the back link here in the Server Component or add it to ChallengeDetail.
    // Let's put it here to keep navigation static/server-rendered if possible, 
    // but typically it's fine.
    
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
             <Link 
                href="/attic"
                className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Attic
            </Link>
            <ChallengeDetail challenge={challenge} />
        </main>
    );
}
