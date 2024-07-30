    import { NextResponse } from 'next/server';
    import { PrismaClient } from '@prisma/client';
    import { setCorsHeaders } from '@/lib/corsMiddleware'; // Adjust the import path as needed

    const prisma = new PrismaClient();

    export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        // Fetch the post by slug
        const post = await prisma.post.findUnique({
        where: {
            slug: slug,
            draft: false, // Ensure the post is not a draft
        },
        });

        if (!post) {
        // If no post is found, return a 404 response
        let response = NextResponse.json({ error: 'Post not found' }, { status: 404 });
        response = setCorsHeaders(response);
        return response;
        }

        // Return the post data
        let response = NextResponse.json(post);
        response = setCorsHeaders(response);
        return response;
    } catch (error) {
        console.error('Error fetching post:', error);
        let response = NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
        response = setCorsHeaders(response);
        return response;
    }
    }

    export async function OPTIONS() {
    let response = NextResponse.json({});
    response = setCorsHeaders(response);
    return response;
    }
