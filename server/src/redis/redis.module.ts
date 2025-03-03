import { Module, Global } from '@nestjs/common';
import { redisClient } from './redis.config';

@Global()
@Module({
  providers: [{ provide: 'REDIS_CLIENT', useValue: redisClient }],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
