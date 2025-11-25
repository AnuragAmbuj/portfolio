"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Work", href: "/#work" },
        { name: "About", href: "/#about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoImageContainer}>
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            fill
                            className="object-cover"
                            sizes="32px"
                            priority
                        />
                    </div>
                    <span className={styles.logoText}>
                        Anurag <span className="text-gradient">Ambuj</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.links}>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.link}>
                            {link.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Controls */}
                <div className={styles.mobileControls}>
                    <ThemeToggle />
                    <button
                        className={styles.menuButton}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.mobileLink}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
