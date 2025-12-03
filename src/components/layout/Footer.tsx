import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Anurag Ambuj. All rights reserved.
                    </p>
                    <div className={styles.socials}>
                        <a href="https://github.com/anuragambuj" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://x.com/nikallus" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                        <a href="https://www.linkedin.com/in/anurag-ambuj-75b773b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
