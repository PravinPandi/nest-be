import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private prisma: PrismaService) {}

  @Get('users/count')
  async getUserCount() {
    const totalUsers = await this.prisma.user.count();
    const newUsers = await this.prisma.user.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    });
    return { totalUsers, newUsers };
  }

  @Get('users/trends')
  async getUserTrends() {
    const trends = await this.prisma.user.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });
    return trends.map((t) => ({ date: t.createdAt, count: t._count.id }));
  }

  @Get('users/activity')
  async getUserActivity() {
    return this.prisma.user.findMany({
      select: { email: true, lastLogin: true },
      orderBy: { lastLogin: 'desc' },
      take: 10,
    });
  }
}
