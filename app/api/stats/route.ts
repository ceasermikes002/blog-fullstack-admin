import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const [totalPosts, totalLikes, totalFavorites, totalUsers] = await Promise.all([
      prisma.post.count(),
      prisma.like.count(),
      prisma.favorite.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({ totalPosts, totalLikes, totalFavorites, totalUsers });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
