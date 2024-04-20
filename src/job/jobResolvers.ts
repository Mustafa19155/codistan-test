import { createJob, getJob } from "./data";

export const jobResolver = {
  Query: {
    job: async (_: any, { id }) => {
      return getJob(id);
    },
  },
  Mutation: {
    createJob: async (_: any, { input }: any) => {
      return createJob(input.data);
    },
  },
};
