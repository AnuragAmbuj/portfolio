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

                if (!password || !adminPassword) {
                    return null;
                }

                if (password === adminPassword) {
                    return { id: "1", name: "Admin", email: "admin@example.com" }
                }
                return null
            },
        }),
    ],
})
