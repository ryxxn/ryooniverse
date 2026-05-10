import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({ adapter });

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

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHook(app: INestApplication) {
    process.on('beforeExit', async () => {
      await this.onModuleDestroy();
      await app.close();
    });
  }
}
