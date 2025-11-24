import styles from "./TechStack.module.css";

const skills = {
    Languages: ["Java", "Go", "Rust", "Zig", "Kotlin", "Swift"],
    Backend: ["Spring Boot", "Microservices", "Kafka", "Distributed Systems", "PostgreSQL"],
    Tools: ["Docker", "Kubernetes", "Git", "IntelliJ Platform", "AWS"],
};

export default function TechStack() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.heading}>Tech Stack</h2>
                <div className={styles.grid}>
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className={styles.category}>
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <div className={styles.list}>
                                {items.map((item) => (
                                    <span key={item} className={styles.item}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
