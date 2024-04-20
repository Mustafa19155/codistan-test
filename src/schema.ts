import userSchema from "./user";
import jobSchema from "./job";

const schema = {
  typeDefs: [userSchema.types, jobSchema.types],
  resolvers: [userSchema.resolvers, jobSchema.resolvers],
};

export default schema;
