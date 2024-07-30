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
    
    console.log('Request body:', { postId, userId }); // Enhanced logging
    
    if (!postId || !userId) {
      console.error('Missing postId or userId:', { postId, userId });
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
      console.warn('Like already exists for:', { postId, userId });
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
    console.error('Error while processing the request:', error); // Enhanced error logging
    return NextResponse.json({ error: 'An error occurred while liking the post' }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  // Handle CORS preflight requests
  const res = new NextResponse();
  likeCors(req, res); // Set headers for CORS
  return res;
}
