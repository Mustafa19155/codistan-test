import { lpopAsync, redisClient } from "./redis";

// Worker function to process jobs from the queue
export default async function processJobs() {
  while (true) {
    const jobData = await lpopAsync("job_queue");
    if (jobData) {
      const job = JSON.parse(jobData);
      // Process job
      console.log("Processing job:", job);
      // Update job status in Redis
      await redisClient.set(
        `job:${job._id}`,
        JSON.stringify({ ...job, status: "processed" })
      );
    } else {
      // No jobs in the queue, wait for a while before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
