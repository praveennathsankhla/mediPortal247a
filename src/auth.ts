import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function getAdmin(email: string) {
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        return admin;
    } catch (error) {
        console.error("Failed to fetch admin:", error);
        throw new Error("Failed to fetch admin.");
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Mocked credentials
                    if (email === "pnath6745@gmail.com" && password === "kalu@kalu") {
                        return {
                            id: "1",
                            name: "Admin User",
                            email: "pnath6745@gmail.com",
                        };
                    }
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
