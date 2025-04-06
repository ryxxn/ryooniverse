import { createClient, RedisClientType } from 'redis';
import { REDIS_HOST, REDIS_PORT } from 'src/lib/constants';

export class RedisClient {
  private static instance: RedisClientType | null = null;

  static getInstance(): RedisClientType {
    if (!RedisClient.instance) {
      RedisClient.instance = createClient({
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
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
