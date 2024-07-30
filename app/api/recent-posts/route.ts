import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const recentPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 3, // Adjust the number of recent posts as needed
    });

    return NextResponse.json(recentPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
