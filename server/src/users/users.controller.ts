import { Controller, Patch, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { getClientIp } from 'src/lib/constants/utils';
import { IS_PRODUCTION } from 'src/lib/constants';

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
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      path: '/api',
    });

    return res.json(user);
  }

  @Patch('')
  async update(@Req() req: Request) {
    const userIdFromCookie = req.cookies?.user_id;

    return await this.usersService.update(userIdFromCookie, req.body);
  }
}
