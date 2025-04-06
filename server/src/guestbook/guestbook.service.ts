import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GuestbookDto } from './dto/guestbook.dto';

@Injectable()
export class GuestbookService {
  constructor(private prisma: PrismaService) {}

  async getAll({ page, size }) {
    const skip = (page - 1) * size;
    const take = size;
    const guestbooks = await this.prisma.guestbook.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            character: true,
          },
        },
      },
    });

    const total = await this.prisma.guestbook.count();
    const totalPage = Math.ceil(total / size);

    return {
      page,
      size,
      total,
      totalPage,
      data: guestbooks,
    };
  }

  async create(
    userId: string,
    body: Pick<GuestbookDto, 'message' | 'isPrivate'>,
  ) {
    const { message, isPrivate } = body;

    if (!userId) {
      throw new Error('User not found');
    }

    await this.prisma.guestbook.create({
      data: {
        message,
        isPrivate,
        user: {
          connect: { id: userId },
        },
      },
    });

    return {
      message: 'Guestbook created successfully',
    };
  }
}
