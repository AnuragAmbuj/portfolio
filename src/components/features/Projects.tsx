import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { getGithubProjects } from "@/lib/github";
import styles from "./Projects.module.css";

export default async function Projects() {
  const allProjects = await getGithubProjects();
  
  // Logic to select "Featured" projects:
  // 1. Sort by "Recently Pushed" (pushedAt descending)
  // 2. Take top 3
  const featuredProjects = [...allProjects]
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, 3);

  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
            {/* Using a standard h2 here, relying on global styles or module if preferred */}
          <h2 className={styles.title}>Featured Projects</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            My most active open source contributions and personal projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="flex justify-center">
            <Link 
                href="/projects"
                className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
            >
                <span className="font-medium">View All Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
}
