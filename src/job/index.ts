import { jobTypesDef } from "./jobTypes";
import { jobResolver } from "./jobResolvers";

const jobSchema = {
  types: jobTypesDef,
  resolvers: jobResolver,
};

export default jobSchema;
