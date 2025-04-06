import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AccessLogService } from 'src/access-log/access-log.service';
import { generateCharacter } from 'src/lib/constants/utils';
import { generateRandomNickname } from 'src/lib/constants/utils/generate-random-nickname';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private accessLogService: AccessLogService,
  ) {}

  async enter(ip: string, userId?: string) {
    let user;

    if (userId) {
      user = await this.prisma.user.findUnique({ where: { id: userId } });
    }

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          ipAddress: ip,
          username: generateRandomNickname(),
          character: generateCharacter(),
        },
      });
    }

    await this.accessLogService.logAccess(user.id, ip);
    return user;
  }

  async update(userId: string, body: Partial<UserDto>) {
    const { username, character } = body;
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        username,
        character,
      },
    });
    return user;
  }
}
