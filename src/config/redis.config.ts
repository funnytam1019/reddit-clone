import IORedis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: process.env['REDIS_HOST'] || 'localhost',
  port: (process.env['REDIS_PORT'] as unknown as number) || 6379,

  // delay connection until the first redis command to be sent
  lazyConnect: true,

  // retry after times * 100 seconds
  retryStrategy: (times) => Math.max(times * 100, 3000),
};

const Redis = new IORedis({ ...options });

Redis.on('error', (err) => {
  console.log('redis running into some trouble: \n', err);
});

Redis.on('connection', () => {
  console.log('redis connection started ...');
});

export default Redis;
