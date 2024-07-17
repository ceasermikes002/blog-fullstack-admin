import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import { join, dirname, relative } from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const slug = formData.get('slug') as string;
    const authorImage = formData.get('authorImage') as string;
    const authorName = formData.get('authorName') as string;
    const featuredImageFile = formData.get('featuredImage') as File;

    let featuredImage = '';
    if (featuredImageFile) {
      const buffer = await featuredImageFile.arrayBuffer();
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const fileName = `${Date.now()}-${featuredImageFile.name}`;
      const filePath = join(uploadDir, fileName);

      // Ensure the uploads directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(filePath, Buffer.from(buffer));
      featuredImage = `/uploads/${fileName}`; // Relative path to be stored in database
    }

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        featuredImage,
        draft: false,
        authorImage,
        authorName,
      },
    });

    console.log('Created new post:', newPost);

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
