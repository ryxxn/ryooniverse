import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';

export class RedisClient {
  private static instance: RedisClientType | null = null;

  static getInstance(): RedisClientType {
    if (!RedisClient.instance) {
      const configService = new ConfigService();
      RedisClient.instance = createClient({
        url: `redis://${configService.get<string>('REDIS_HOST')}:${configService.get<string>('REDIS_PORT')}`,
      });

      RedisClient.instance.on('error', (err) => {
        console.error('❌ Redis Error:', err);
      });

      RedisClient.instance.connect().then(() => {
        console.log('✅ Connected to Redis');
      });
    }
    return RedisClient.instance;
  }
}

export const redisClient: RedisClientType = RedisClient.getInstance();
