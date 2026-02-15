"use client";

import { Linkedin, Twitter, Facebook, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const pathname = usePathname();
    // Default to proper URL in production, fallback for dev
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://anuragambuj.com";
    const url = `${baseUrl}${pathname}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: <Linkedin size={20} />,
            url: `https://www.linkedin.com/feed/?shareActive=true&text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:text-brand-linkedin",
        },
        {
            name: "X (Twitter)",
            icon: <Twitter size={20} />,
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: "hover:text-brand-twitter",
        },
        {
            name: "Facebook",
            icon: <Facebook size={20} />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:text-brand-facebook",
        },
    ];

    const handleShare = (linkUrl: string) => {
        window.open(linkUrl, "_blank", "width=600,height=400");
    };

    return (
        <div className="flex items-center justify-center gap-4">
            <Share2 size={16} className="text-muted-foreground" />
            <div className="flex gap-2">
                {shareLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => handleShare(link.url)}
                        className={`p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200 ${link.color} hover:bg-gray-200 dark:hover:bg-gray-700`}
                        title={`Share on ${link.name}`}
                        aria-label={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}
