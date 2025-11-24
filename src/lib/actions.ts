"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return "Invalid credentials.";
            }
            return "Something went wrong.";
        }
        throw error;
    }
}

export async function deletePost(id: string) {
    const { prisma } = await import("@/lib/db"); // Dynamic import to avoid circular deps if any
    await prisma.post.delete({ where: { id } });
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/admin/posts");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
}

export async function createPost(formData: FormData) {
    const { prisma } = await import("@/lib/db");
    const { auth } = await import("@/auth");
    const { redirect } = await import("next/navigation");
    const { revalidatePath } = await import("next/cache");

    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("User not found");

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";

    await prisma.post.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            published,
            authorId: user.id,
        },
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
    const { prisma } = await import("@/lib/db");
    const { redirect } = await import("next/navigation");
    const { revalidatePath } = await import("next/cache");

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";

    await prisma.post.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            published,
        },
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    redirect("/admin/posts");
}

export async function incrementView(slug: string) {
    const { prisma } = await import("@/lib/db");
    const post = await prisma.post.findUnique({ where: { slug } });
    if (post) {
        await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
        });
    }

    // Also track global analytics
    const path = `/blog/${slug}`;
    await prisma.analytics.upsert({
        where: { id: path }, // Using path as ID for simplicity or findFirst
        update: { views: { increment: 1 } },
        create: { path, views: 1 },
    });
}
