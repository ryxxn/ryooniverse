import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GuestbookService } from './guestbook.service';
import { GuestbookController } from './guestbook.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class GuestbookModule {}
