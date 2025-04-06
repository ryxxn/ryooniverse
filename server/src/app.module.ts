import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsModule } from './gateway/ws.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AccessLogModule } from './access-log/access-log.module';

@Module({
  imports: [
    WsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AccessLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
