// funtion to allow users to create a new job with specific data and enqeue them in redis job queue
import { GraphQLError } from "graphql";
import Job from "./model";
import { rpushAsync } from "../redis";

export const createJob = async (data: string) => {
  try {
    const newJob = new Job({
      data,
      status: "PENDING",
    });

    // Add job to Redis queue
    await rpushAsync("job_queue", JSON.stringify(newJob));

    return await newJob.save();
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const getJob = async () => {
  try {
    return await Job.findOne({ status: "PENDING" });
  } catch (err) {
    throw new GraphQLError(err);
  }
};
