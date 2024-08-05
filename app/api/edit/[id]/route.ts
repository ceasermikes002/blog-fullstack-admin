import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

export default async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    let slug = formData.get('slug') as string | null;
    const authorImage = formData.get('authorImage') as string;
    const authorName = formData.get('authorName') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const featuredImageFile = formData.get('featuredImage') as File;

    let featuredImage = '';
    if (featuredImageFile) {
      const buffer = await featuredImageFile.arrayBuffer();
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const fileName = `${Date.now()}-${featuredImageFile.name}`;
      const filePath = join(uploadDir, fileName);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(filePath, Buffer.from(buffer));
      featuredImage = `/uploads/${fileName}`;
    }

    if (!id || !title) {
      return NextResponse.json({ error: 'ID and title are required' }, { status: 400 });
    }

    // Handle null slug by generating one if necessary
    if (!slug) {
      slug = title.toLowerCase().replace(/ /g, '-');
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        featuredImage,
        draft: false,
        authorImage,
        authorName,
        category,
        description,
      },
    });

    console.log('Updated post:', updatedPost);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
