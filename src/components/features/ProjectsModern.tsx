import Link from "next/link";
import { ArrowRight, Star, ExternalLink, GitFork, FolderGit2 } from "lucide-react";
import { getGithubProjects } from "@/lib/github";

export default async function ProjectsModern() {
  const allProjects = await getGithubProjects();

  const featuredProjects = [...allProjects]
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, 4);

  return (
    <section id="projects" className="py-20 border-t border-border/60">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
              Open Source &amp; Systems
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Featured Engineering Work
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-base">
              Active repositories, architectural prototypes, and systems implementations.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline self-start md:self-end"
          >
            <span>Browse All Repositories</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento / Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.title}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between ${
                idx === 0 ? "md:col-span-2 bg-gradient-to-br from-card via-card to-primary/5" : ""
              }`}
            >
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <FolderGit2 size={20} />
                    </div>
                    {project.languages && project.languages.length > 0 ? (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted border border-border text-foreground flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: project.languages[0].color || "#FF9808" }}
                        />
                        {project.languages[0].name}
                      </span>
                    ) : project.tech && project.tech.length > 0 ? (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted border border-border text-foreground">
                        {project.tech[0]}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.stars !== undefined && project.stars > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star size={13} className="text-primary fill-primary" />
                        {project.stars}
                      </span>
                    )}
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View source repository"
                    >
                      <ExternalLink size={18} />
                    </Link>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                  {project.description || "Robust software repository focusing on clean systems design and modern engineering standards."}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  Updated: {new Date(project.pushedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground group-hover:text-primary flex items-center gap-1 transition-colors"
                >
                  Inspect Architecture <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
