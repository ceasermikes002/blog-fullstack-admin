// app/api/engagement/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { format } from 'date-fns';

const formatDate = (date: Date) => format(date, 'yyyy-MM');

export async function GET() {
  try {
    const likesData = await prisma.like.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });

    const signupsData = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });

    const aggregateData = (data: { createdAt: Date, _count: { id: number } }[]) => {
      const result: Record<string, number> = {};
      data.forEach(item => {
        const monthYear = formatDate(new Date(item.createdAt));
        result[monthYear] = (result[monthYear] || 0) + item._count.id;
      });
      return result;
    };

    const likesGrouped = aggregateData(likesData);
    const signupsGrouped = aggregateData(signupsData);

    const startMonth = new Date(Math.min(...likesData.map(like => new Date(like.createdAt).getTime()), 
                                          ...signupsData.map(signup => new Date(signup.createdAt).getTime())));
    const endMonth = new Date(Math.max(...likesData.map(like => new Date(like.createdAt).getTime()), 
                                        ...signupsData.map(signup => new Date(signup.createdAt).getTime())));
    
    const months = [];
    let currentMonth = startMonth;
    while (currentMonth <= endMonth) {
      const monthKey = formatDate(currentMonth);
      months.push({
        date: monthKey,
        likes: likesGrouped[monthKey] || 0,
        signups: signupsGrouped[monthKey] || 0,
      });
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return NextResponse.json(months);
  } catch (error) {
    console.error('Error fetching engagement data:', error);
    return NextResponse.error();
  }
}
