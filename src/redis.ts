import * as redis from "redis";
import { promisify } from "util";

// Create Redis client
export const redisClient = redis.createClient();
// Promisify Redis functions for easier async/await usage
export const rpushAsync = promisify(redisClient.rPush).bind(redisClient);
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const lpopAsync = promisify(redisClient.lPop).bind(redisClient);

// import Bull from "bull";

// const redisConfig = {
//   redis: {
//     port: 6379, // Redis server port
//     host: "localhost", // Redis server host
//   },
// };

// export const jobQueue = new Bull("jobQueue", redisConfig);

// // Process jobs from the queue
// jobQueue.process(async (job) => {
//   console.log("Processing job:", job.data);
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   return { result: "Job processed successfully" };
// });

// // Event listener for completed jobs
// jobQueue.on("completed", (job, result) => {
//   console.log(`Job ID ${job.id} completed with result:`, result);
// });

// // Event listener for failed jobs
// jobQueue.on("failed", (job, err) => {
//   console.error(`Job ID ${job.id} failed with error:`, err);
// });
