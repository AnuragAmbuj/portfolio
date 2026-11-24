"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { clsx } from "clsx";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full opacity-0" />;
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all border border-transparent hover:border-border",
        className
      )}
      aria-label="Toggle theme"
      title={`Current theme: ${theme}`}
    >
      {theme === "light" && <Sun size={17} />}
      {theme === "dark" && <Moon size={17} />}
      {theme === "system" && <Monitor size={17} />}
    </button>
  );
}
