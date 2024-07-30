import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { likeCors } from '@/lib/likeCors';  // Ensure this path is correct

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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

    // Check if the favorite already exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json({ error: 'Already favorited' }, { status: 400 });
    }

    // Create a new favorite
    const favorite = await prisma.favorite.create({
      data: {
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(favorite, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while favoriting the post' }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse();
  likeCors(req, res); // Set headers for CORS
  return res;
}
