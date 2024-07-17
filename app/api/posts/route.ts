import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { setCorsHeaders } from '@/lib/corsMiddleware';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        draft: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('Fetched posts:', posts);
    let response = NextResponse.json(posts);
    response = setCorsHeaders(response);
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    let response = NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    response = setCorsHeaders(response);
    return response;
  }
}

export async function OPTIONS() {
  let response = NextResponse.json({});
  response = setCorsHeaders(response);
  return response;
}
