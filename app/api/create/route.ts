// app/api/create/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: any) {
  try {
    const { title, content, slug, featuredImage,  authorImage, authorName } = req.body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 }); // Send bad request error
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
