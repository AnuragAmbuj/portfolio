import GsapKite from "@/components/experiments/GsapKite";

export default function GsapExperimentPage() {
  return (
    <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">
        GSAP Animation Experiment
      </h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">
            Motion Path Animation
          </h2>
          <GsapKite />
        </section>
      </div>
    </div>
  );
}
