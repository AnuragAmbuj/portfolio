import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    role: "Team Lead - Engineering",
    company: "BluSmart Mobility",
    period: "Oct 2022 - May 2025",
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
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-2">
              <span className="inline-block h-px w-8 bg-primary" aria-hidden="true" />
              Experience
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              A decade of shipping systems
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-xl">
              Roles, engineering ownership, and the platforms delivered along the way.
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

        {/* Editorial timeline: single column, rule-separated rows */}
        <div className="border-t border-border">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="group grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-10 py-7 border-b border-border"
            >
              {/* Left rail: period + logo */}
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-3">
                <div className="relative w-9 h-9 rounded-lg bg-muted/60 p-1.5 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={26}
                    height={26}
                    className="object-contain max-h-6 max-w-6"
                  />
                </div>
                <span className="text-xs font-mono tabular-nums text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              {/* Right: role, company, highlights, tags */}
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                  {exp.role}
                </h3>
                <div className="text-sm font-medium text-primary mt-0.5">
                  {exp.company}
                </div>

                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm text-foreground/85 leading-relaxed"
                    >
                      <span
                        className="mt-[9px] inline-block h-1 w-1 rounded-full bg-primary shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1.5">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
