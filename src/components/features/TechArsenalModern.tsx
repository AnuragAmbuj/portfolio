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
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
            Technical Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Skills &amp; Technologies
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Tools and languages used in production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="p-5 sm:p-6 rounded-xl bg-card border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {group.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-md bg-muted text-foreground border border-border/40 font-mono"
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
