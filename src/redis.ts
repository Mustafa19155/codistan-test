import * as redis from "redis";

// Create Redis client
export const redisClient = redis.createClient();
redisClient
  .connect()
  .then((res) => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Error connecting to Redis: ", err);
  });
