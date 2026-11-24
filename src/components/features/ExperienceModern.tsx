import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Software Engineering Expert",
    company: "Applied Materials",
    period: "Jun 2025 - Present",
    description: "Designing domain-driven architectures for semiconductor manufacturing software.",
    logo: "/companies/Applied_Materials/Applied_Materials.svg",
    tags: ["Distributed Systems", "Domain-Driven Design"],
  },
  {
    role: "Team Lead",
    company: "BluSmart Mobility",
    period: "Oct 2022 - Apr 2024",
    description: "Led backend engineering for the electric ride-hailing platform, core dispatch, and charging services.",
    logo: "/companies/Blusmart.png",
    tags: ["High Concurrency", "Fleet Dispatch", "Microservices"],
  },
  {
    role: "SDE 3",
    company: "BharatPe",
    period: "Apr 2022 - Oct 2022",
    description: "Built high-performance lending and merchant bill payment services.",
    logo: "/companies/BharatPe/BharatPe_idcm_6aijV_0.svg",
    tags: ["FinTech", "Lending", "Event Streaming"],
  },
  {
    role: "SDE 2",
    company: "Mobikwik",
    period: "Jun 2021 - Mar 2022",
    description: "Worked on the Lending Management System (LMS) and repayment solutions.",
    logo: "/companies/mobikwik.png",
    tags: ["LMS", "Payment Gateways"],
  },
  {
    role: "Lead SDE",
    company: "Freecharge",
    period: "Aug 2018 - Mar 2021",
    description: "Led backend feature development for digital payments and merchant solutions.",
    logo: "/companies/Freecharge.jpeg",
    tags: ["Payments", "Java"],
  },
  {
    role: "Software Engineer",
    company: "Envestnet | Yodlee",
    period: "Jul 2016 - Aug 2018",
    description: "Developed financial data aggregation and analytics pipelines.",
    logo: "/companies/Yodlee.jpeg",
    tags: ["Financial Aggregation", "Data Pipelines"],
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
              Roles and companies over the past 10 years.
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

        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-10 h-10 rounded-lg bg-muted p-1.5 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={28}
                      height={28}
                      className="object-contain max-h-7 max-w-7"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-medium text-muted-foreground">
                      {exp.company}
                    </div>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted text-foreground border border-border">
                    {exp.period}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-muted text-foreground/80 font-mono"
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
