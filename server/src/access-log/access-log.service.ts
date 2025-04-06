import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AccessLogService {
  constructor(private prisma: PrismaService) {}

  async logAccess(userId: string, ipAddress: string) {
    return this.prisma.accessLog.create({
      data: {
        userId,
        ipAddress,
      },
    });
  }
}
