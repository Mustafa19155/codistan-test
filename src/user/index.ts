import { userTypesDef } from "./userTypes";
import { userResolver } from "./userResolvers";

const userSchema = {
  types: userTypesDef,
  resolvers: userResolver,
};

export default userSchema;
