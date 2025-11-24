"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import styles from "./Login.module.css";

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className={styles.container}>
            <form action={dispatch} className={styles.form}>
                <h1 className={styles.title}>Admin Login</h1>
                <div className={styles.field}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        className={styles.input}
                    />
                </div>
                <LoginButton />
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className={styles.button} aria-disabled={pending}>
            {pending ? "Logging in..." : "Login"}
        </button>
    );
}
