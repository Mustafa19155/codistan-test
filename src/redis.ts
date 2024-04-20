import redis from "redis";
import { promisify } from "util";

// Create Redis client
export const redisClient = redis.createClient();
// Promisify Redis functions for easier async/await usage
export const rpushAsync = promisify(redisClient.rPush).bind(redisClient);
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const lpopAsync = promisify(redisClient.lPop).bind(redisClient);
