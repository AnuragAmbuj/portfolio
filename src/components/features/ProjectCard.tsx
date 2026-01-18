"use client";

import { motion } from "framer-motion";
import { Folder, Star, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/github";

interface ProjectCardProps {
  project: Project;
  layout?: "grid" | "list";
}

export default function ProjectCard({ project, layout = "grid" }: ProjectCardProps) {
  const isGrid = layout === "grid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all duration-300 ${
        !isGrid ? "flex flex-col md:flex-row gap-6 p-6" : "p-6 flex flex-col h-full"
      }`}
    >
      <div className={`flex items-start justify-between ${!isGrid ? "md:w-1/4" : "mb-4"}`}>
        <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
          <Folder size={24} strokeWidth={1.5} />
        </div>
        <div className="flex gap-3">
          {project.demoLink && (
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              <Globe size={20} />
            </Link>
          )}
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <ExternalLink size={20} />
          </Link>
        </div>
      </div>

      <div className={`${!isGrid ? "flex-1 flex flex-col justify-center" : "flex-1"}`}>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
            <Link href={project.link} target="_blank">{project.title}</Link>
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className={`flex items-center justify-between mt-auto ${!isGrid ? "w-full" : ""}`}>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-wrap gap-2">
                {project.languages && project.languages.length > 0 ? (
                    project.languages.map((lang) => (
                        <span
                            key={lang.name}
                            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                            {lang.name}
                        </span>
                    ))
                ) : (
                    project.tech.slice(0, 5).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
                    >
                        {tech}
                    </span>
                    ))
                )}
            </div>
          </div>
          
           <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 ml-4">
               {/* Optional: Add Last Updated if desired */}
               {/* <span>{project.lastUpdated}</span> */}
                <div className="flex items-center gap-1">
                  <Star size={16} />
                  <span>{project.stars}</span>
                </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
