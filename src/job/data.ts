// funtion to allow users to create a new job with specific data and enqeue them in redis job queue
import { GraphQLError } from "graphql";
import { getAsync, rpushAsync } from "../redis";
// import { jobQueue } from "../redis";

export const createJob = async (data: string) => {
  try {
    rpushAsync("job_queue", data);
    // await jobQueue.add({
    //   data,
    //   result: "",
    // });
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const getJob = async (id: string) => {
  try {
    console.log(id);
    const job = await getAsync(`job:${id}`);
    if (!job) throw new Error("Job not found");
    return job;
    return {
      id: job.id,
      data: job.data,
      result: job.returnvalue,
    };
  } catch (err) {
    throw new GraphQLError(err);
  }
};
