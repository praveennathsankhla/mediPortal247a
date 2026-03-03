import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { name, slug } = await req.json();
        const city = await prisma.city.create({ data: { name, slug } });
        return NextResponse.json(city);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const cities = await prisma.city.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(cities);
}
