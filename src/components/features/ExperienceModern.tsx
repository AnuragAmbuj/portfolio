import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

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
    description: "Designing domain-driven architectures and distributed control software required for advanced semiconductor manufacturing processes.",
    logo: "/companies/Applied_Materials/Applied_Materials.svg",
    tags: ["Distributed Systems", "Domain-Driven Design", "Semiconductor Tech"],
  },
  {
    role: "Team Lead",
    company: "BluSmart Mobility",
    period: "Oct 2022 - Apr 2024",
    description: "Led the core backend engineering team for India's premier all-electric ride-hailing platform. Architected mission-critical dispatch and charging infrastructure services.",
    logo: "/companies/Blusmart.png",
    tags: ["High-Concurrency", "EV Fleet Dispatch", "Team Leadership", "Microservices"],
  },
  {
    role: "SDE 3",
    company: "BharatPe",
    period: "Apr 2022 - Oct 2022",
    description: "Architected high-throughput lending engines and merchant bill payment pipelines, ensuring sub-second settlement and bulletproof consistency.",
    logo: "/companies/BharatPe/BharatPe_idcm_6aijV_0.svg",
    tags: ["FinTech", "High-Throughput Lending", "Event Streaming"],
  },
  {
    role: "SDE 2",
    company: "Mobikwik",
    period: "Jun 2021 - Mar 2022",
    description: "Engineered scalable Lending Management Systems (LMS) and fault-tolerant repayment pipelines handling multi-million transaction volumes.",
    logo: "/companies/mobikwik.png",
    tags: ["LMS", "Payment Gateways", "Distributed Databases"],
  },
  {
    role: "Lead SDE",
    company: "Freecharge",
    period: "Aug 2018 - Mar 2021",
    description: "Led the core backend team delivering merchant payment settlement systems, wallet infrastructure, and third-party banking integrations.",
    logo: "/companies/Freecharge.jpeg",
    tags: ["Merchant Platform", "Digital Payments", "Java"],
  },
  {
    role: "Software Engineer",
    company: "Envestnet | Yodlee",
    period: "Jul 2016 - Aug 2018",
    description: "Built high-volume financial data aggregation engines and high-throughput analytics pipelines for enterprise tier banking clients.",
    logo: "/companies/Yodlee.jpeg",
    tags: ["Financial Aggregation", "Data Pipelines", "Performance Optimization"],
  },
];

export default function ExperienceModern() {
  return (
    <section className="py-20 border-t border-border/60">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
              Career Trajectory
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Production Experience &amp; Scale
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-base">
              Over a decade of leading teams and engineering high-scale distributed backends.
            </p>
          </div>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline self-start md:self-end"
          >
            <span>Read Complete Background</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* High-Density Clean List */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="group p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                {/* Left: Logo & Role */}
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-xl bg-muted/60 p-2 border border-border/60 flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={32}
                      height={32}
                      className="object-contain max-h-8 max-w-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-medium text-foreground/80">
                      {exp.company}
                    </div>
                  </div>
                </div>

                {/* Right: Period Tag */}
                <div className="self-start md:self-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted border border-border text-foreground">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {exp.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted/70 text-foreground/80 border border-border/40 font-mono"
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
