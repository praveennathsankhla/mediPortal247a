import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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

        const hospital = await prisma.hospital.update({
            where: { id },
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
                publishDate: new Date(publishDate),
                lastUpdated: new Date(lastUpdated),
            },
        });

        return NextResponse.json(hospital);
    } catch (error: any) {
        console.error("Hospital update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.hospital.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Hospital deletion error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
