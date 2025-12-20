import Link from "next/link";
import Image from "next/image";
import styles from "./MDXComponents.module.css";
import Mermaid from "./Mermaid";

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href;

    if (!href) return <span {...props}>{props.children}</span>;

    const isInternalLink = href.startsWith("/") || href.startsWith("#");

    if (isInternalLink) {
        return (
            <Link href={href} className={styles.link} {...props}>
                {props.children}
            </Link>
        );
    }

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            {...props}
        >
            {props.children}
        </a>
    );
};

const RoundedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image alt={props.alt || ""} className={styles.image} {...props as any} />;
};

export const components = {
    a: CustomLink,
    img: RoundedImage,
    Mermaid,
};
