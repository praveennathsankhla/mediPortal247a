import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@mediportal247.online";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.admin.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
        },
        create: {
            email: adminEmail,
            password: hashedPassword,
        },
    });

    console.log({ admin });

    // 1. Seed Cities
    const cities = [
        { name: "New Delhi", slug: "delhi" },
        { name: "Mumbai", slug: "mumbai" },
        { name: "Bangalore", slug: "bangalore" },
        { name: "Chennai", slug: "chennai" },
        { name: "Hyderabad", slug: "hyderabad" }
    ];

    const cityMap: Record<string, string> = {};
    for (const c of cities) {
        const city = await prisma.city.upsert({
            where: { slug: c.slug },
            update: {},
            create: { name: c.name, slug: c.slug },
        });
        cityMap[c.slug] = city.id;
    }

    // 2. Seed Specialties
    const specialties = ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Gastroenterology", "Multi-Specialty"];
    const specialtyMap: Record<string, string> = {};
    for (const name of specialties) {
        const spec = await prisma.specialty.upsert({
            where: { slug: name.toLowerCase().replace(/\s+/g, "-") },
            update: {},
            create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
        });
        specialtyMap[name] = spec.id;
    }

    // 3. Seed Blog Categories
    const categories = ["Health Tips", "Disease Awareness", "Medical News", "Wellness"];
    const catMap: Record<string, string> = {};
    for (const name of categories) {
        const cat = await prisma.blogCategory.upsert({
            where: { slug: name.toLowerCase().replace(/\s+/g, "-") },
            update: {},
            create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
        });
        catMap[name] = cat.id;
    }

    // 4. Seed Hospitals (Long-form content)
    const hospitals = [
        {
            name: "Apollo Hospital Delhi",
            slug: "apollo-hospital-delhi",
            cityId: cityMap["delhi"],
            specialtyId: specialtyMap["Multi-Specialty"],
            accreditations: "NABH, JCI Accredited",
            contactInfo: "Sarita Vihar, Delhi Mathura Road, New Delhi - 110076, +91-11-26925858",
            emergencyInfo: "011-26925801 (24/7 Emergency)",
            specialties: "Cardiology, Oncology, Neurology, Orthopaedics",
            facilities: "24x7 Pharmacy, Blood Bank, ICU, NICU, Advanced Imaging, Robot-Assisted Surgery, International Patient Lounge",
            departments: "Cardiology, Oncology, Neurology, Nephrology, Orthopaedics, Gastrointestinal Sciences",
            overview: `Indraprastha Apollo Hospitals, New Delhi is a multi-specialty tertiary acute care hospital with over 710 beds and is one of the most sought-after destinations in Asia for healthcare. A state-of-the art modern facility in the heart of the capital, it is spread over 15 acres and has a built-up area of over 600,000 square feet.

Indraprastha Apollo Hospitals, New Delhi was the first hospital in India to be internationality accredited by Joint Commission International (JCI) for the fourth time in a row. It is one of the best multi-speciality tertiary acute care hospitals with over 710 beds and is one of the most sought after destinations in Asia for healthcare.

The hospital has some of the best clinical outcomes in the world. It provides comprehensive healthcare services across more than 50 specialties including Cardiac Sciences, Oncology, Neurosciences, Nephrology, Orthopaedics, Gastroenterology & Hepatology, Emergency Care and many more.

Apollo Hospitals, Delhi has been a pioneer in several path-breaking medical procedures. It was the first hospital in the world to perform a successful pediatric liver transplant and has since performed thousands of high-complexity transplants. The cardiology department is equipped with latest heart-lung machines and robotic surgical systems, offering minimally invasive heart surgeries.

Patient safety and comfort are paramount at Apollo Delhi. The hospital features dedicated wings for international patients, providing assistance with visa, language translation, and dietary requirements. The nursing staff is trained to international standards, ensuring compassionate care throughout the patient's journey.

With the latest technologies like 64-Slice CT, 3 Tesla MRI, Novalis Tx, and Da Vinci Robotic System, Apollo Hospital Delhi continues to lead the healthcare revolution in India, serving millions of patients from over 120 countries.`,
            faqs: JSON.stringify([
                { question: "Is there an international patient desk?", answer: "Yes, Apollo Delhi has a dedicated International Patient Services department." },
                { question: "Are visiting hours restricted?", answer: "Yes, visiting hours are typically 4 PM to 6 PM, but check with the specific ward." }
            ]),
            author: "mediportal247 Editorial Team",
            metaTitle: "Apollo Hospital Delhi - Contact, Doctors & Facilities",
            metaDescription: "Detailed profile of Indraprastha Apollo Hospital, New Delhi. Explore specialties, emergency contact info, and world-class medical facilities."
        }
        // Add more if needed, but one solid one is good for now
    ];

    for (const h of hospitals) {
        await prisma.hospital.upsert({
            where: { slug: h.slug },
            update: h,
            create: h,
        });
    }

    // 5. Seed Blog Posts (Long-form content)
    const blogPosts = [
        {
            title: "Top 10 Health Tips for 2026: A Comprehensive Guide",
            slug: "top-10-health-tips-2026",
            categoryId: catMap["Health Tips"],
            author: "Dr. Anjali Sharma",
            content: `In the rapidly evolving landscape of 2026, maintaining optimal health requires a blend of traditional wisdom and modern technological integration. As we navigate through a post-digital era, our bodies face unique challenges from sedentary screen-time and environmental stressors. This guide provides actionable insights for total wellness.

1. Prioritize Circadian Rhythm: With the rise of blue-light emitting devices, our sleep-wake cycles are more disrupted than ever. Exposure to natural sunlight for at least 30 minutes in the morning helps regulate cortisol and melatonin levels, improving sleep quality and cognitive function.

2. Mindful Nutrition - The 80/20 Rule: Focus on whole, plant-based foods 80% of the time. Incorporate 'Ancient Grains' like Millets, which have seen a massive resurgence in India for their high fiber and low glycemic index. These are essential for managing modern lifestyle diseases like Type 2 Diabetes.

3. Functional Fitness: Move away from isolated gym workouts and embrace functional movement that mimics daily activities. Stretching, core stabilization, and balance exercises are critical as we age to prevent musculoskeletal issues.

4. Mental Hygiene: Just as we brush our teeth, we must clean our minds. Daily meditation, even for 10 minutes, has been shown to reduce the physical markers of stress. In 2026, 'Digital Detox' days are no longer a luxury but a necessity for neurological health.

5. Hydration Beyond Water: Focus on electrolyte balance. Consuming coconut water or lemon-infused water provides essential minerals that plain filtered water might lack, especially in the tropical climate of cities like Mumbai and Chennai.

6. Preventive Screenings: Regular check-ups at accredited hospitals are vital. With advanced genomics, we can now identify predispositions to conditions and tackle them through lifestyle before they manifest.

7. The Power of Community: Humans are social creatures. Loneliness has been linked to heart disease. Engaging in community health activities or simply regular social interaction can boost your immune system.

8. Gut Health: The gut-brain axis is the frontier of medical science. Incorporating probiotics like homemade curd or fermented vegetables supports a healthy microbiome, which is the cornerstone of 70% of our immune system.

9. Posture Literacy: As we spend hours on varied devices, 'Tech-Neck' is a rising epidemic. Simple chin-tucks and ergonomic setups at home-offices can prevent long-term spinal issues.

10. Sustainable Living: Your health is tied to the planet's health. Reducing plastic use and choosing organic local produce reduces your intake of microplastics and pesticides, which are increasingly linked to hormonal imbalances.

In conclusion, health in 2026 is not about perfection but about consistent, small choices. By integrating these tips, you can build a resilient foundation for a vibrant life.`,
            faqs: JSON.stringify([
                { question: "How often should I have a full body check-up?", answer: "For adults under 40, once every two years is usually sufficient. Over 40, an annual check-up is recommended." },
                { question: "Are digital health trackers accurate?", answer: "They are excellent for trends (like heart rate over a week) but should not be used for clinical diagnosis." }
            ]),
            references: "Source: National Health Authority of India, WHO Guidelines 2025, Indian Journal of Medical Research.",
            metaTitle: "Essential Health Tips 2026 - mediportal247 Blog",
            metaDescription: "Explore the ultimate guide to health in 2026. From circadian rhythms to gut health, learn how to stay fit in the modern era."
        }
    ];

    for (const b of blogPosts) {
        await prisma.blogPost.upsert({
            where: { slug: b.slug },
            update: b,
            create: b,
        });
    }

    console.log("High-quality seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
