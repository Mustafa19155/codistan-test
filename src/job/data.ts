import { GraphQLError } from "graphql";
import { redisClient } from "../redis";

let jobIdCounter = 0;

export const createJob = async (data: string) => {
  try {
    ++jobIdCounter;
    const job = { id: jobIdCounter, data, status: "pending", result: null };
    await redisClient.rPush("job_queue", JSON.stringify(job));
    return job;
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const getJob = async (id: string) => {
  try {
    const job = await redisClient.get("job_queue");
    if (!job) throw new Error("Job not found");
    return JSON.parse(job);
  } catch (err) {
    throw new GraphQLError(err);
  }
};
