import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgba(var(--background-rgb), <alpha-value>)",
                foreground: "rgba(var(--foreground-rgb), <alpha-value>)",
                card: {
                    DEFAULT: "rgba(var(--card-rgb), <alpha-value>)",
                    foreground: "rgba(var(--card-foreground-rgb), <alpha-value>)", // Note: Need to ensure this var exists or fallback
                },
                popover: {
                    DEFAULT: "rgba(var(--popover-rgb), <alpha-value>)",
                    foreground: "rgba(var(--popover-foreground-rgb), <alpha-value>)",
                },
                primary: {
                    DEFAULT: "rgba(var(--primary-rgb), <alpha-value>)",
                    foreground: "rgba(var(--primary-foreground-rgb), <alpha-value>)",
                },
                secondary: {
                    DEFAULT: "rgba(var(--secondary-rgb), <alpha-value>)",
                    foreground: "rgba(var(--secondary-foreground-rgb), <alpha-value>)",
                },
                muted: {
                    DEFAULT: "rgba(var(--muted-rgb), <alpha-value>)",
                    foreground: "rgba(var(--muted-foreground-rgb), <alpha-value>)",
                },
                accent: {
                    DEFAULT: "rgba(var(--accent-rgb), <alpha-value>)",
                    foreground: "rgba(var(--accent-foreground-rgb), <alpha-value>)",
                },
                destructive: {
                    DEFAULT: "rgba(var(--destructive-rgb), <alpha-value>)",
                    foreground: "rgba(var(--destructive-foreground-rgb), <alpha-value>)",
                },
                border: "rgba(var(--border-rgb), <alpha-value>)",
                input: "rgba(var(--input-rgb), <alpha-value>)",
                ring: "rgba(var(--ring-rgb), <alpha-value>)",
                chart: {
                    "1": "var(--chart-1)", // Keep as var for now if no RGB
                    "2": "var(--chart-2)",
                    "3": "var(--chart-3)",
                    "4": "var(--chart-4)",
                    "5": "var(--chart-5)",
                },
                brand: {
                    linkedin: "#0077b5",
                    twitter: "#1DA1F2",
                    facebook: "#4267B2",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
