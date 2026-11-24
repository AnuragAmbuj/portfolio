import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  logo: string;
  highlights: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Software Engineering Expert",
    company: "Applied Materials",
    period: "Jun 2025 - Present",
    logo: "/companies/Applied_Materials/Applied_Materials.svg",
    highlights: [
      "Designing domain-driven architectures for semiconductor software",
      "Developing mission-critical manufacturing execution solutions",
    ],
    tags: ["Distributed Systems", "Domain-Driven Design", "Semiconductor Tech"],
  },
  {
    role: "Team Lead & Architect",
    company: "BluSmart Mobility",
    period: "Oct 2022 - Apr 2024",
    logo: "/companies/Blusmart.png",
    highlights: [
      "Led backend engineering teams for Hub and Fleet technologies",
      "Built charging recommendation platform for EV fleet optimization",
      "Architected streaming data pipelines for vehicle telemetry",
      "Optimized JVM performance, reducing infra costs by 50%",
    ],
    tags: ["Fleet Tech", "Telemetry", "JVM Tuning", "Kafka"],
  },
  {
    role: "SDE 3",
    company: "BharatPe",
    period: "Apr 2022 - Oct 2022",
    logo: "/companies/BharatPe/BharatPe_idcm_6aijV_0.svg",
    highlights: [
      "Implemented rule engine for merchant convenience fee calculations",
      "Designed and deployed card tokenization architecture",
      "Built high-throughput systems for user offer management",
    ],
    tags: ["FinTech", "Rule Engines", "Tokenization", "Payments"],
  },
  {
    role: "SDE 2",
    company: "Mobikwik",
    period: "Jun 2021 - Mar 2022",
    logo: "/companies/mobikwik.png",
    highlights: [
      "Owned Lending Management System (LMS) core components",
      "Developed high-volume loan repayment processing features",
    ],
    tags: ["LMS", "Loan Repayments", "Distributed DBs"],
  },
  {
    role: "Lead SDE",
    company: "Freecharge",
    period: "Aug 2018 - Mar 2021",
    logo: "/companies/Freecharge.jpeg",
    highlights: [
      "Built merchant subscription and monetization platform",
      "Enhanced core backend architecture to handle peak transaction spikes",
      "Streamlined merchant onboarding and third-party integrations",
    ],
    tags: ["Merchant Platform", "Subscriptions", "Java", "Scalability"],
  },
  {
    role: "Software Engineer",
    company: "Envestnet | Yodlee",
    period: "Jul 2016 - Aug 2018",
    logo: "/companies/Yodlee.jpeg",
    highlights: [
      "Engineered financial data aggregation platforms for enterprise clients",
      "Optimized high-volume ETL data processing pipelines",
    ],
    tags: ["Data Aggregation", "ETL Pipelines", "Optimization"],
  },
];

export default function ExperienceModern() {
  return (
    <section className="py-16 border-t border-border/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
              Experience
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Work History
            </h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Roles, engineering ownership, and systems delivered over a decade.
            </p>
          </div>

          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline self-start md:self-end"
          >
            <span>Full Profile</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Compact 2-Column Grid eliminating empty space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Header: Logo, Title, Period */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-lg bg-muted p-1 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        width={26}
                        height={26}
                        className="object-contain max-h-6 max-w-6"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-medium text-muted-foreground">
                        {exp.company}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-muted text-primary border border-border whitespace-nowrap shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Specific Engineering Accomplishments */}
                <div className="space-y-1.5 my-3 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                  {exp.highlights.map((item) => (
                    <p key={item} className="leading-snug">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded bg-muted text-foreground/80 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
