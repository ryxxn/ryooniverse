import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { redisClient } from 'src/redis/redis.config';
import { WsService } from './ws.service';
import { UserDto } from 'src/users/dto/user.dto';

@WebSocketGateway({ cors: true })
@Injectable()
export class WsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly wsService: WsService) {}

  afterInit(server: Server) {
    this.wsService.setSocketServer(server);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() user: { position: { x: number; y: number } } & UserDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Redis에 유저 상태 저장
    await redisClient.set(`socket:${client.id}`, user.id);
    await redisClient.hSet(`user:${user.id}`, {
      id: user.id,
      username: user.username,
      character: user.character,
      x: user.position.x,
      y: user.position.y,
    });
    await redisClient.expire(`user:${user.id}`, 3600);

    // 기존 접속자 목록 전달
    const keys = await redisClient.keys('user:*');
    const users = await Promise.all(
      keys.map(async (key) => {
        const info = await redisClient.hGetAll(key);
        return {
          id: key.replace('user:', ''),
          x: Number(info.x),
          y: Number(info.y),
          username: info.username,
          character: info.character || '1',
        };
      }),
    );
    client.emit('users:update', users);

    // 모든 클라이언트에게 이동 브로드캐스트
    this.server.emit('move', {
      ...user,
      position: user.position,
    });

    // 추후 로드밸런싱할 거면 Redis Pub/Sub으로 브로드캐스트하자.
    // await redisClient.publish('character_move', JSON.stringify(data));
  }

  // 캐릭터 이동 처리
  @SubscribeMessage('move')
  async handleMove(
    @MessageBody() data: { position: { x: number; y: number } } & UserDto,
  ) {
    // Redis에 유저 상태 저장
    await redisClient.hSet(`user:${data.id}`, {
      id: data.id,
      username: data.username,
      character: data.character,
      x: data.position.x,
      y: data.position.y,
    });
    await redisClient.expire(`user:${data.id}`, 3600);

    // Redis Pub/Sub으로 모든 서버에 브로드캐스트
    // await redisClient.publish('character_move', JSON.stringify(data));

    // 모든 클라이언트에 브로드캐스트
    this.server.emit('move', data);
  }

  // 휘발성 채팅 처리
  @SubscribeMessage('chat')
  async handleChat(@MessageBody() data: { username: string; message: string }) {
    console.log(`💬 Chat: ${data.username}: ${data.message}`);

    // Redis Pub/Sub으로 채팅 메시지 브로드캐스트
    // await redisClient.publish('chat_channel', JSON.stringify(data));

    // 모든 클라이언트에 메시지 전송
    this.server.emit('chat', data);
  }

  // 클라이언트 연결 해제 처리
  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = await redisClient.get(`socket:${client.id}`);
    if (!userId) return;
    // Redis에서 유저 상태 삭제
    await redisClient.del(`user:${userId}`);

    const keys = await redisClient.keys('user:*');
    const users = await Promise.all(
      keys.map(async (key) => {
        const info = await redisClient.hGetAll(key);
        return {
          id: key.replace('user:', ''),
          x: Number(info.x),
          y: Number(info.y),
          username: info.username,
          character: info.character || '1',
        };
      }),
    );
    this.server.emit('users:update', users);

    // await redisClient.publish('user_disconnected', client.id);
  }
}
