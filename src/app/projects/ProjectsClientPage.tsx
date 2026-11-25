"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import ProjectCard from "@/components/features/ProjectCard";
import { Project } from "@/lib/github";
import { motion } from "framer-motion";

interface ProjectsClientPageProps {
  initialProjects: Project[];
}

export default function ProjectsClientPage({ initialProjects }: ProjectsClientPageProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                 <h1 className="text-4xl font-bold text-foreground mb-4">
                    All Projects
                </h1>
                <p className="text-lg text-muted-foreground">
                    A comprehensive list of my open source work and repositories.
                </p>
            </div>
          
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg self-start md:self-center">
            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-md transition-all ${
                layout === "grid"
                  ? "bg-card shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded-md transition-all ${
                layout === "list"
                  ? "bg-card shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <motion.div 
            layout 
            className={`grid gap-6 ${
                layout === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}
        >
          {initialProjects.map((project) => (
            <ProjectCard key={project.title} project={project} layout={layout} />
          ))}
        </motion.div>
        
        {initialProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500">
                <p>No projects found. Check back later!</p>
            </div>
        )}
      </div>
    </div>
  );
}
