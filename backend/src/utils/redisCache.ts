// backend/src/utils/redisCache.ts
import { redis } from '../config/redis';

export const cacheGet = async (key: string): Promise<any | null> => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const cacheSet = async (key: string, value: any, ttlSeconds = 300): Promise<void> => {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
};

export const cacheDel = async (key: string): Promise<void> => {
  await redis.del(key);
};