import { Cpu, Server, Wrench } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Languages & Runtimes",
    description: "Primary languages for concurrent and low-latency systems.",
    icon: Cpu,
    skills: ["Java", "Go", "Rust", "Zig", "Kotlin", "Swift"],
  },
  {
    title: "Distributed Systems & Data",
    description: "Event streaming, messaging, and database persistence.",
    icon: Server,
    skills: ["Kafka", "Distributed Systems", "Domain-Driven Design", "Microservices", "PostgreSQL", "Spring Boot"],
  },
  {
    title: "Tools & Infrastructure",
    description: "Deployment, containers, and development tooling.",
    icon: Wrench,
    skills: ["Docker", "Kubernetes", "AWS", "IntelliJ Platform", "Git"],
  },
];

export default function TechArsenalModern() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-2">
            <span className="inline-block h-px w-8 bg-primary" aria-hidden="true" />
            Technical stack
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Tools of the trade
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-xl">
            Languages and infrastructure used in production systems, day to day.
          </p>
        </div>

        {/* Full-width rule-separated skill rows, one accent column for the label */}
        <div className="border-t border-border">
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-10 py-7 border-b border-border"
              >
                <div>
                  <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <span className="text-primary">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    {group.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 max-w-[26ch]">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-md bg-muted text-foreground border border-border/60 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
