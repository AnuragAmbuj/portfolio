export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  topics: string[];
  homepage: string | null;
  fork: boolean;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
  stars: number;
  lastUpdated: string; // Formatted date for display
  pushedAt: string;    // Raw ISO string for sorting
  demoLink?: string;
}

const USERNAME = "AnuragAmbuj";

export async function getGithubProjects(): Promise<Project[]> {
  try {
    // Revalidate every hour (3600 seconds)
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub projects");
    }

    const repos: GithubRepo[] = await response.json();

    // Filter out forks and profile repository if desired
    const filteredRepos = repos.filter(
      (repo) => 
        !repo.fork && // Exclude forks
        !repo.name.toLowerCase().includes(USERNAME.toLowerCase()) // Exclude special profile repo
    );

    return filteredRepos.map((repo) => ({
      title: repo.name,
      description: repo.description || "No description provided.",
      link: repo.html_url,
      // Use topics if available, else fall back to the main language
      tech: repo.topics.length > 0 ? repo.topics : [repo.language || "Code"],
      stars: repo.stargazers_count,
      lastUpdated: new Date(repo.pushed_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      pushedAt: repo.pushed_at,
      demoLink: repo.homepage || undefined,
    }));
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}
