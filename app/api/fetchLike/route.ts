import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { likeCors } from '@/lib/likeCors';  // Ensure this path is correct

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  if (likeCors(req, res)) {
    return res;
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const likes = await prisma.like.findMany({
      where: { userId },
      select: { postId: true }
    });

    return NextResponse.json(likes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching likes' }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse();
  likeCors(req, res);
  return res;
}
