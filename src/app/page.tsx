import HeroModern from "@/components/features/HeroModern";
import ProjectsModern from "@/components/features/ProjectsModern";
import ExperienceModern from "@/components/features/ExperienceModern";
import TechArsenalModern from "@/components/features/TechArsenalModern";
import LatestWritingModern from "@/components/features/LatestWritingModern";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <HeroModern />
      <ProjectsModern />
      <ExperienceModern />
      <TechArsenalModern />
      <LatestWritingModern />
    </div>
  );
}
