import Hero from "@/components/features/Hero";
import Timeline from "@/components/features/Timeline";
import Projects from "@/components/features/Projects";
import TechStack from "@/components/features/TechStack";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Timeline />
      <Projects />
      <TechStack />
    </>
  );
}
