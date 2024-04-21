import { redisClient } from "./redis";

// Worker function to process jobs from the queue
export default async function processJobs() {
  while (true) {
    const jobData = await redisClient.lPop("job_queue");
    if (jobData) {
      console.log("Processing job:", jobData);
      const job = JSON.parse(jobData);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // Update job status in Redis
      await redisClient.set(
        `${job.id}`,
        JSON.stringify({ ...job, status: "processed", result: "success" })
      );
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
