import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            role: 'ADMIN',
        },
    })

    const post = await prisma.post.upsert({
        where: { slug: 'hello-world' },
        update: {},
        create: {
            title: 'Hello World',
            slug: 'hello-world',
            excerpt: 'This is my first blog post.',
            content: `
# Hello World

Welcome to my new portfolio and blog. This system is built with:

- **Next.js 15**
- **Prisma**
- **PostgreSQL**
- **MDX**

## Code Example

\`\`\`typescript
const greeting = "Hello World";
console.log(greeting);
\`\`\`
      `,
            published: true,
            authorId: user.id,
        },
    })

    console.log({ user, post })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
