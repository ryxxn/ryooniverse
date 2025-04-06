import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';

@Module({
  providers: [WsGateway, WsService],
  exports: [WsService],
})
export class WsModule {}
