import Link from "next/link";
import { ArrowRight, Star, ExternalLink, FolderGit2 } from "lucide-react";
import { getGithubProjects } from "@/lib/github";

export default async function ProjectsModern() {
  const allProjects = await getGithubProjects();

  const featuredProjects = [...allProjects]
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, 4);

  return (
    <section id="projects" className="py-16 border-t border-border/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
              Projects
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Featured Work
            </h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Repositories and open source projects from my GitHub.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FolderGit2 size={18} />
                    </div>
                    {project.languages && project.languages.length > 0 ? (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted border border-border text-foreground flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: project.languages[0].color || "#FF9808" }}
                        />
                        {project.languages[0].name}
                      </span>
                    ) : project.tech && project.tech.length > 0 ? (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted border border-border text-foreground">
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
                      className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View source repository"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description || "Open source project on GitHub."}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Updated {new Date(project.pushedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground group-hover:text-primary flex items-center gap-1 transition-colors"
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
