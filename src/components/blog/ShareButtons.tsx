"use client";

import { Linkedin, Twitter, Facebook, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const pathname = usePathname();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://anuragambuj.com";
    const url = `${baseUrl}${pathname}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: <Linkedin size={16} />,
            url: `https://www.linkedin.com/feed/?shareActive=true&text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:text-primary",
        },
        {
            name: "X (Twitter)",
            icon: <Twitter size={16} />,
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: "hover:text-primary",
        },
        {
            name: "Facebook",
            icon: <Facebook size={16} />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:text-primary",
        },
    ];

    const handleShare = (linkUrl: string) => {
        window.open(linkUrl, "_blank", "width=600,height=400");
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Share</span>
            <div className="flex gap-1.5">
                {shareLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => handleShare(link.url)}
                        className={`p-1.5 rounded-lg bg-muted text-foreground/80 border border-border transition-colors ${link.color}`}
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
