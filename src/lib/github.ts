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
  languages_url: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
  languages?: { name: string; percentage: number; color: string }[];
  stars: number;
  lastUpdated: string; // Formatted date for display
  pushedAt: string;    // Raw ISO string for sorting
  demoLink?: string;
}

const USERNAME = "AnuragAmbuj";

// GitHub Language Colors (simplified map)
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
  React: "#61dafb",
  Dart: "#00B4AB",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  // Add more as needed, default fallback exists
};

export async function getGithubProjects(): Promise<Project[]> {
  try {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Revalidate every hour
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
      { 
          headers,
          next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) {
        // Log detailed error for debugging
        const text = await response.text();
        console.error(`Failed to fetch GitHub projects: ${response.status} ${response.statusText}`, text);
        return [];
    }

    const repos: GithubRepo[] = await response.json();

    const filteredRepos = repos.filter(
      (repo) => 
        !repo.fork && 
        !repo.name.toLowerCase().includes(USERNAME.toLowerCase()) &&
        repo.name !== "BlogPostDiscussions"
    );

    // Fetch languages for each repo
    const projectsWithLanguages = await Promise.all(
        filteredRepos.map(async (repo) => {
            let languages: { name: string; percentage: number; color: string }[] = [];
            
            try {
                const langResponse = await fetch(repo.languages_url, { 
                    headers,
                    next: { revalidate: 3600 } 
                });
                
                if (langResponse.ok) {
                    const langData: Record<string, number> = await langResponse.json();
                    const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
                    
                    languages = Object.entries(langData)
                        .map(([name, bytes]) => ({
                            name,
                            percentage: Math.round((bytes / totalBytes) * 100),
                            color: LANGUAGE_COLORS[name] || "#cccccc"
                        }))
                        .sort((a, b) => b.percentage - a.percentage); // Sort by percentage
                }
            } catch (error) {
                console.error(`Failed to fetch languages for ${repo.name}`, error);
            }

            return {
                title: repo.name,
                description: repo.description || "No description provided.",
                link: repo.html_url,
                tech: repo.topics.length > 0 ? repo.topics : [repo.language || "Code"],
                languages: languages.length > 0 ? languages : undefined,
                stars: repo.stargazers_count,
                lastUpdated: new Date(repo.pushed_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                }),
                pushedAt: repo.pushed_at,
                demoLink: repo.homepage || undefined,
            };
        })
    );

    return projectsWithLanguages;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}
