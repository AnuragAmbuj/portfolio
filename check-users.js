const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log('Creating admin user...');
        user = await prisma.user.create({
            data: {
                email,
                name: 'Admin',
                role: 'ADMIN',
            },
        });
        console.log('Created user:', user);
    } else {
        console.log('User already exists:', user);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
