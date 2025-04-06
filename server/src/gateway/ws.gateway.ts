import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { redisClient } from 'src/redis/redis.config';

@WebSocketGateway({ cors: true })
@Injectable()
export class WsGateway {
  @WebSocketServer()
  server: Server;

  // 클라이언트가 접속하면 실행
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`✅ Client connected: ${client.id}`);
    await redisClient.publish('user_connected', client.id);
  }

  // 캐릭터 이동 처리
  @SubscribeMessage('move')
  async handleMove(
    @MessageBody() data: { id: string; position: { x: number; y: number } },
    // @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `📌 Character moved: ${data.id} to ${JSON.stringify(data.position)}`,
    );

    // Redis Pub/Sub으로 모든 서버에 브로드캐스트
    await redisClient.publish('character_move', JSON.stringify(data));

    // 모든 클라이언트에 브로드캐스트
    this.server.emit('move', data);
  }

  // 휘발성 채팅 처리
  @SubscribeMessage('chat')
  async handleChat(@MessageBody() data: { username: string; message: string }) {
    console.log(`💬 Chat: ${data.username}: ${data.message}`);

    // Redis Pub/Sub으로 채팅 메시지 브로드캐스트
    await redisClient.publish('chat_channel', JSON.stringify(data));

    // 모든 클라이언트에 메시지 전송
    this.server.emit('chat', data);
  }

  // 클라이언트 연결 해제 처리
  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
    await redisClient.publish('user_disconnected', client.id);
  }
}
