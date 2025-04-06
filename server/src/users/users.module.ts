import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AccessLogModule } from 'src/access-log/access-log.module';

@Module({
  imports: [PrismaModule, AccessLogModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
