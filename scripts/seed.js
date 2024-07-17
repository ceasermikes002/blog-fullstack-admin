const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // await prisma.post.deleteMany({});

    await prisma.post.createMany({
      data: [
        {
          title: 'First Post',
          content: 'This is the content of the first post.',
          slug: 'first-post', // Ensure this slug is unique
          featuredImage: 'https://via.placeholder.com/150',
          draft: false,
          authorName: 'John Doe',
          authorImage: 'https://via.placeholder.com/50',
        },
        {
          title: 'Second Post',
          content: 'This is the content of the second post.',
          slug: 'second-post-1', // Ensure this slug is unique
          featuredImage: 'https://via.placeholder.com/150',
          draft: false,
          authorName: 'Jane Smith',
          authorImage: 'https://via.placeholder.com/50',
        },
        {
          title: 'Third Post',
          content: 'This is the content of the third post.',
          slug: 'third-post', // Ensure this slug is unique
          featuredImage: 'https://via.placeholder.com/150',
          draft: false,
          authorName: 'Jane Smith',
          authorImage: 'https://via.placeholder.com/50',
        },
      ],
    });

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
