import { Cpu, Server, Wrench } from "lucide-react";

const ARSENAL_CATEGORIES = [
  {
    title: "Languages & Systems Runtimes",
    description: "Compiled, concurrent, and low-latency environments engineered for raw throughput and memory safety.",
    icon: Cpu,
    skills: [
      { name: "Java", level: "Expert • 10 yrs" },
      { name: "Go", level: "High Concurrency" },
      { name: "Rust", level: "Memory-Safe Systems" },
      { name: "Zig", level: "Low-Level Native" },
      { name: "Kotlin", level: "Modern Backend" },
      { name: "Swift", level: "Native Tooling" },
    ],
  },
  {
    title: "Distributed Architecture & Data",
    description: "Event-driven backends, resilient message brokers, and transactional data consistency at multi-million scale.",
    icon: Server,
    skills: [
      { name: "Kafka", level: "Streaming & Pipelines" },
      { name: "Distributed Systems", level: "Consensus & Partitioning" },
      { name: "Domain-Driven Design", level: "Bounded Contexts" },
      { name: "Microservices", level: "Service Mesh & RPC" },
      { name: "PostgreSQL", level: "Relational Modeling" },
      { name: "Spring Boot", level: "Enterprise Frameworks" },
    ],
  },
  {
    title: "Infrastructure & Developer Tooling",
    description: "Containerization, cloud deployments, and custom developer platform integrations.",
    icon: Wrench,
    skills: [
      { name: "Kubernetes", level: "Orchestration" },
      { name: "Docker", level: "Containerization" },
      { name: "AWS", level: "Cloud Architecture" },
      { name: "IntelliJ Platform", level: "Custom Plugins" },
      { name: "Git", level: "Monorepo & CI/CD" },
    ],
  },
];

export default function TechArsenalModern() {
  return (
    <section className="py-20 border-t border-border/60">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
            Engineering Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Technologies &amp; Architecture
          </h2>
          <p className="text-muted-foreground mt-2 text-base">
            Core stack chosen for performance, type safety, scalability, and predictable operational behavior.
          </p>
        </div>

        {/* 3-Column Categorized Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ARSENAL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-border/50">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-muted/50 hover:bg-muted text-xs transition-colors"
                    >
                      <span className="font-semibold text-foreground font-mono">
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground text-[11px]">
                        {skill.level}
                      </span>
                    </div>
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
