import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { cors } from '@/lib/cors';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventType, userData } = req.body;

  try {
    if (eventType === 'user.created') {
      await prisma.user.create({
        data: {
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          profileImage: userData.profile_image,
        },
      });
    } else if (eventType === 'user.updated') {
      await prisma.user.update({
        where: { id: userData.id },
        data: {
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          profileImage: userData.profile_image,
        },
      });
    } else if (eventType === 'user.deleted') {
      await prisma.user.delete({
        where: { id: userData.id },
      });
    } else {
      return res.status(400).json({ error: 'Unknown event type' });
    }

    res.status(200).json({ message: 'User synced successfully' });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
