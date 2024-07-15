const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        id: 'd0367ef2-1a86-4e44-a174-eb864b40b36c',
        title: 'First Post',
        content: 'This is the content of the first post.',
        slug: 'first-post',
        featuredImage: 'https://via.placeholder.com/150',
        draft: false,
        authorId: '1',          // Replace with actual author ID
        authorName: 'John Doe', // Replace with actual author name
        authorImage: 'https://via.placeholder.com/50', // Optional: Replace with actual author image URL
      },
      {
        id: '2a86efb2-1c74-4b44-b174-eb864b40b36c',
        title: 'Second Post',
        content: 'This is the content of the second post.',
        slug: 'second-post',
        featuredImage: 'https://via.placeholder.com/150',
        draft: false,
        authorId: '2',          // Replace with actual author ID
        authorName: 'Jane Smith',// Replace with actual author name
        authorImage: 'https://via.placeholder.com/50', // Optional: Replace with actual author image URL
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
