import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { eventType, userData, userId } = await req.json();

    console.log('Received request:', req);
    console.log('Received userData:', userData);
    console.log('Received userId:', userId);

    // Validate the incoming data
    if (!userData || !userId) {
      console.error('Validation Error: userData or userId is missing');
      return new Response(JSON.stringify({ error: 'userData and userId are required' }), { status: 400 });
    }

    if (eventType === 'user.deleted') {
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (existingUser) {
        await prisma.user.delete({
          where: { id: userId },
        });
      } else {
        console.warn(`User with ID ${userId} does not exist. No deletion performed.`);
      }
    } else if (eventType === 'user.created' || eventType === 'user.updated') {
      if (!userData.email_addresses || !userData.email_addresses.length || !userData.email_addresses[0]?.email_address) {
        console.error('Validation Error: User email is required');
        return new Response(JSON.stringify({ error: 'User email is required' }), { status: 400 });
      }

      const email = userData.email_addresses[0].email_address;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // If user exists, update it
        await prisma.user.update({
          where: { email },
          data: {
            id: userId,
            email,
            firstName: userData.first_name ?? null,
            lastName: userData.last_name ?? null,
            profileImage: userData.image_url ?? null,
          },
        });
      } else {
        // If user does not exist, create a new user
        await prisma.user.create({
          data: {
            id: userId,
            email,
            firstName: userData.first_name ?? null,
            lastName: userData.last_name ?? null,
            profileImage: userData.image_url ?? null,
          },
        });
      }
    } else {
      console.error('Validation Error: Unknown event type');
      return new Response(JSON.stringify({ error: 'Unknown event type' }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'User synced successfully' }), { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Internal server error';
    console.error('Error syncing user:', errorMessage);
    return new Response(JSON.stringify({ error: `Internal server error: ${errorMessage}` }), { status: 500 });
  }
}
