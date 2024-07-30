import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { likeCors } from '@/lib/likeCors';  // Ensure this path is correct

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
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

    // Find the favorite to be deleted
    const favorite = await prisma.favorite.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (!favorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
    }

    // Delete the favorite
    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while unfavoriting the post' }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse();
  likeCors(req, res); // Set headers for CORS
  return res;
}
