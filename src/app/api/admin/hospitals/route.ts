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
            name, slug, overview, specialties = "", facilities = "", departments = "",
            accreditations = "", emergencyInfo = "", contactInfo = "", mapUrl = "", imageUrl = "", imageCredit = "",
            cityName, specialtyId, metaTitle = "", metaDescription = "", publishDate, lastUpdated
        } = data;

        // Resolve cityId from cityName
        let resolvedCityId = null;
        if (cityName && typeof cityName === 'string') {
            const citySlug = cityName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const city = await prisma.city.upsert({
                where: { name: cityName },
                update: {},
                create: {
                    name: cityName,
                    slug: citySlug
                }
            });
            resolvedCityId = city.id;
        }

        const publishDateObj = publishDate ? new Date(publishDate) : new Date();
        const lastUpdatedObj = lastUpdated ? new Date(lastUpdated) : new Date();

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
                imageCredit,
                cityId: resolvedCityId,
                specialtyId: specialtyId || null,
                metaTitle,
                metaDescription,
                faqs: "[]", // Default empty FAQs
                author: session.user?.email || "Admin",
                publishDate: isNaN(publishDateObj.getTime()) ? new Date() : publishDateObj,
                lastUpdated: isNaN(lastUpdatedObj.getTime()) ? new Date() : lastUpdatedObj,
            },
        });

        return NextResponse.json(hospital);
    } catch (error: unknown) {
        console.error("Hospital creation error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    const hospitals = await prisma.hospital.findMany({
        orderBy: { createdAt: "desc" },
        include: { city: true },
    });
    return NextResponse.json(hospitals);
}
