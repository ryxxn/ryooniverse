import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Node.js의 종료 이벤트를 사용하여 종료 핸들러 설정
  constructor() {
    super();
    const exitHandler = async () => {
      console.log('Prisma is disconnecting...');
      await this.$disconnect();
      console.log('Prisma is disconnected!');
      process.exit(0);
    };

    process.on('exit', exitHandler);
    process.on('beforeExit', exitHandler);
    process.on('SIGINT', exitHandler);
    process.on('SIGTERM', exitHandler);
    process.on('SIGUSR2', exitHandler);
  }

  async enableShutdownHook(app: INestApplication) {
    process.on('beforeExit', async () => {
      await this.onModuleDestroy();
      await app.close();
    });
  }
}
