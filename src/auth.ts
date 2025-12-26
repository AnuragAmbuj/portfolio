import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const password = credentials?.password && String(credentials.password);
                const adminPassword = process.env.ADMIN_PASSWORD;

                console.log("Authorize called with credentials");

                if (!password || !adminPassword) {
                    console.log("Missing password or env var");
                    return null;
                }

                if (password === adminPassword) {
                    console.log("Password match! returning user.");
                    return { id: "1", name: "Admin", email: "admin@example.com" }
                }
                console.log("Password mismatch return null");
                return null
            },
        }),
    ],
})
