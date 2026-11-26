import Link from "next/link";
import { ArrowRight, Star, ExternalLink, FolderGit2 } from "lucide-react";
import { getGithubProjects } from "@/lib/github";

export default async function ProjectsModern() {
  const allProjects = await getGithubProjects();

  const featuredProjects = [...allProjects]
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, 4);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-2">
              <span className="inline-block h-px w-8 bg-primary" aria-hidden="true" />
              Selected work
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Projects with a point of view
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-xl">
              Repositories and open source projects from my GitHub — the four most recently pushed.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline self-start md:self-end"
          >
            <span>All Projects</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric editorial grid: first project spans both columns as a lead feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 flex flex-col justify-between focus-within:border-primary/50 ${
                index === 0 ? "md:col-span-2 md:flex-row md:items-end md:gap-8" : ""
              }`}
            >
              <div className={index === 0 ? "md:flex-1" : ""}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FolderGit2 size={18} />
                    </div>
                    {project.languages && project.languages.length > 0 ? (
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted border border-border"
                        style={{ color: project.languages[0].color || "var(--primary)" }}
                      >
                        {project.languages[0].name}
                      </span>
                    ) : project.tech && project.tech.length > 0 ? (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted border border-border text-primary">
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
                      className="p-2 rounded text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View source repository"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                <h3
                  className={`font-bold text-foreground group-hover:text-primary transition-colors mb-2 ${
                    index === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                  }`}
                >
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </Link>
                </h3>
                <p
                  className={`text-muted-foreground leading-relaxed ${
                    index === 0 ? "text-base sm:text-lg line-clamp-2" : "text-sm line-clamp-3"
                  }`}
                >
                  {project.description || "Open source project on GitHub."}
                </p>
              </div>

              <div
                className={`pt-4 flex items-center justify-between text-xs text-muted-foreground ${
                  index === 0 ? "md:pt-0 md:shrink-0" : "mt-auto"
                }`}
              >
                <span>
                  Updated {new Date(project.pushedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground group-hover:text-primary flex items-center gap-1 transition-colors px-2 py-2 -mr-2"
                >
                  View Repo <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
