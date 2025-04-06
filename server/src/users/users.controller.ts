import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { getClientIp } from 'src/lib/constants/utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('enter')
  async enter(@Req() req: Request, @Res() res: Response) {
    const ip = getClientIp(req);
    const userIdFromCookie = req.cookies?.user_id;

    const user = await this.usersService.enter(ip, userIdFromCookie);

    // set cookie
    res.cookie('user_id', user.id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return res.json(user);
  }
}
