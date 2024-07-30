import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { likeCors } from '@/lib/likeCors';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // Handle CORS
  const res = new NextResponse();
  if (likeCors(req, res)) {
    return res;
  }

  try {
    // Parse the JSON body from the request
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json({ error: 'Post ID and User ID are required' }, { status: 400 });
    }

    // Check if the like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json({ error: 'Already liked' }, { status: 400 });
    }

    // Create a new like
    const like = await prisma.like.create({
      data: {
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(like, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while liking the post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Handle CORS
  const res = new NextResponse();
  if (likeCors(req, res)) {
    return res;
  }

  try {
    // Parse the JSON body from the request
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json({ error: 'Post ID and User ID are required' }, { status: 400 });
    }

    // Find the like to be deleted
    const like = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (!like) {
      return NextResponse.json({ error: 'Like not found' }, { status: 404 });
    }

    // Delete the like
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json({ message: 'Like removed' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while unliking the post' }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  // Handle CORS preflight requests
  const res = new NextResponse();
  likeCors(req, res); // Set headers for CORS
  return res;
}
