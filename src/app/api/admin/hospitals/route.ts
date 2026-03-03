import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await req.json();
        const {
            name, slug, overview, specialties, facilities, departments,
            accreditations, emergencyInfo, contactInfo, mapUrl, imageUrl,
            cityId, specialtyId, metaTitle, metaDescription, publishDate, lastUpdated
        } = data;

        const hospital = await prisma.hospital.create({
            data: {
                name,
                slug,
                overview,
                specialties,
                facilities,
                departments,
                accreditations,
                emergencyInfo,
                contactInfo,
                mapUrl,
                imageUrl,
                cityId: cityId || null,
                specialtyId: specialtyId || null,
                metaTitle,
                metaDescription,
                faqs: "[]", // Default empty FAQs
                author: session.user?.email || "Admin",
                publishDate: new Date(publishDate),
                lastUpdated: new Date(lastUpdated),
            },
        });

        return NextResponse.json(hospital);
    } catch (error: any) {
        console.error("Hospital creation error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const hospitals = await prisma.hospital.findMany({
        orderBy: { createdAt: "desc" },
        include: { city: true },
    });
    return NextResponse.json(hospitals);
}
