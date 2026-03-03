import siteData from "../data/site-data.json";

class StaticPrisma {
    hospital = {
        findMany: async (args?: any) => {
            let data = siteData.hospitals.map(h => ({
                ...h,
                publishDate: new Date(h.publishDate),
                lastUpdated: new Date(h.lastUpdated),
                city: siteData.cities.find(c => c.id === h.cityId),
                specialty: siteData.specialties.find(s => s.id === h.specialtyId),
            }));

            if (args?.where?.city?.slug) {
                data = data.filter(h => h.city?.slug === args.where.city.slug);
            }
            if (args?.where?.slug) {
                data = data.filter(h => h.slug === args.where.slug);
            }

            return data;
        },
        findUnique: async (args: any) => {
            const h = siteData.hospitals.find(h => h.slug === args.where.slug || h.id === args.where.id);
            if (!h) return null;
            return {
                ...h,
                publishDate: new Date(h.publishDate),
                lastUpdated: new Date(h.lastUpdated),
                city: siteData.cities.find(c => c.id === h.cityId),
                specialty: siteData.specialties.find(s => s.id === h.specialtyId),
            };
        },
        count: async () => siteData.hospitals.length,
    };

    blogPost = {
        findMany: async (args?: any) => {
            let data = siteData.blogPosts.map(p => ({
                ...p,
                publishDate: new Date(p.publishDate),
                lastUpdated: new Date(p.lastUpdated),
                category: siteData.blogCategories.find(c => c.id === p.categoryId),
            }));

            if (args?.where?.category?.slug) {
                data = data.filter(p => p.category?.slug === args.where.category.slug);
            }

            if (args?.orderBy?.publishDate === 'desc') {
                data.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
            }

            if (args?.take) {
                data = data.slice(0, args.take);
            }

            return data;
        },
        findUnique: async (args: any) => {
            const p = siteData.blogPosts.find(p => p.slug === args.where.slug || p.id === args.where.id);
            if (!p) return null;
            return {
                ...p,
                publishDate: new Date(p.publishDate),
                lastUpdated: new Date(p.lastUpdated),
                category: siteData.blogCategories.find(c => c.id === p.categoryId),
            };
        },
        count: async () => siteData.blogPosts.length,
    };

    city = {
        findMany: async (args?: any) => {
            const cities = siteData.cities.map(c => ({
                ...c,
                _count: { hospitals: siteData.hospitals.filter(h => h.cityId === c.id).length }
            }));
            return cities;
        },
        findUnique: async (args: any) => {
            const city = siteData.cities.find(c => c.slug === args.where.slug || c.id === args.where.id);
            if (!city) return null;
            return {
                ...city,
                hospitals: await this.hospital.findMany({ where: { city: { slug: city.slug } } }),
                _count: { hospitals: siteData.hospitals.filter(h => h.cityId === city.id).length }
            };
        },
        count: async () => siteData.cities.length,
    };

    specialty = {
        findMany: async () => siteData.specialties,
        findUnique: async (args: any) => siteData.specialties.find(s => s.slug === args.where.slug || s.id === args.where.id),
        count: async () => siteData.specialties.length,
    };

    blogCategory = {
        findMany: async (args?: any) => {
            const categories = [];
            for (const cat of siteData.blogCategories) {
                const posts = args?.include?.posts
                    ? await this.blogPost.findMany({ where: { category: { slug: cat.slug } }, take: args.include.posts.take })
                    : [];
                categories.push({
                    ...cat,
                    posts,
                    _count: { posts: siteData.blogPosts.filter(p => p.categoryId === cat.id).length }
                });
            }
            return categories;
        },
        findUnique: async (args: any) => {
            const cat = siteData.blogCategories.find(c => c.slug === args.where.slug || c.id === args.where.id);
            if (!cat) return null;
            return {
                ...cat,
                posts: await this.blogPost.findMany({ where: { category: { slug: cat.slug } } }),
                _count: { posts: siteData.blogPosts.filter(p => p.categoryId === cat.id).length }
            };
        },
        count: async () => siteData.blogCategories.length,
    };

    admin = {
        findUnique: async (args: any) => {
            if (args.where.email === "admin@mediportal247.online") {
                return {
                    id: "admin_1",
                    email: "admin@mediportal247.online",
                    password: "$2a$10$8K.qY.E6.p.W.E6.p.W.E6.p.W.E6.p.W.E6.p.W.E6.p.W.E6.p.W.",
                };
            }
            return null;
        }
    };

    $connect = async () => { };
    $disconnect = async () => { };
}

export const prisma = new StaticPrisma() as any;
