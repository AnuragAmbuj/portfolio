import { getGithubProjects } from "@/lib/github";
import ProjectsClientPage from "./ProjectsClientPage";

export const metadata = {
  title: "Projects | Anurag Ambuj",
  description: "Browse all open source projects and repositories by Anurag Ambuj.",
};

export default async function ProjectsPage() {
  const projects = await getGithubProjects();
  // Sort by Updated Date for the "All Projects" list usually makes sense, or keep Star sort.
  // Let's stick to Pushed Date (Most active recently) for the full list.
  // The API call already sorts by 'pushed', so the list is already in order.

  return <ProjectsClientPage initialProjects={projects} />;
}
