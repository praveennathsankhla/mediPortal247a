const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });
async function test() {
    try {
        const admins = await prisma.admin.findMany();
        console.log('Admins:', admins);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
