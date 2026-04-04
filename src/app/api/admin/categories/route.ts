import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { name, slug } = await req.json();
        const category = await prisma.blogCategory.create({ data: { name, slug } });
        return NextResponse.json(category);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    const categories = await prisma.blogCategory.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(categories);
}
