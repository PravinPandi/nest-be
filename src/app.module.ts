import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, AnalyticsModule],
  providers: [PrismaService],
})
export class AppModule {}
