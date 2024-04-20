import userSchema from "./user/userSchema";

const schema = {
  typeDefs: userSchema.types,
  resolvers: userSchema.resolvers,
};

export default schema;
