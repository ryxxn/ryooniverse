import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { Request, Response } from 'express';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get('')
  async getAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    return await this.guestbookService.getAll({ page: +page, size: +size });
  }

  @Post('')
  async enter(@Req() req: Request, @Res() res: Response) {
    const userIdFromCookie = req.cookies?.user_id;

    if (!userIdFromCookie) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const guestbook = await this.guestbookService.create(
      userIdFromCookie,
      req.body,
    );

    return res.json(guestbook);
  }
}
