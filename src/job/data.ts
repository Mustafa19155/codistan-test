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
    const jobCount = await redisClient.lLen("job_queue");
    for (let i = 0; i < jobCount; i++) {
      const job = await redisClient.lIndex("job_queue", i);
      const parsedJob = JSON.parse(job);
      if (parsedJob.id === Number(id)) return parsedJob;
    }

    return null;
  } catch (err) {
    throw new GraphQLError(err);
  }
};
