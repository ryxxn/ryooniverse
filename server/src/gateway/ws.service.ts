import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { redisClient } from 'src/redis/redis.config';

@Injectable()
export class WsService implements OnModuleInit {
  private io: Server;

  constructor() {}

  setSocketServer(io: Server) {
    this.io = io;
  }

  async onModuleInit() {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    // 캐릭터 이동 메시지 구독
    await subscriber.subscribe('character_move', (message) => {
      const moveData = JSON.parse(message);
      console.log('🔄 Syncing character move:', moveData);
      this.io.emit('move', moveData);
    });

    // 채팅 메시지 구독
    await subscriber.subscribe('chat_channel', (message) => {
      const chatData = JSON.parse(message);
      console.log('💬 Syncing chat message:', chatData);
      this.io.emit('chat', chatData);
    });
  }
}
