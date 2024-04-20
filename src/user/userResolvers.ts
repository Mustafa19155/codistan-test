import { getUsers, getUser, createUser, updateUser, deleteUser } from "./data";
export const userResolver = {
  Query: {
    users: async (_: any, { page, limit, sortBy }: any) => {
      return getUsers(page, limit, sortBy);
    },
    user: async (_: any, { id }: any) => {
      return getUser(id);
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: any) => {
      return createUser(input);
    },
    updateUser: async (_: any, { id, input }: any) => {
      return updateUser(id, input);
    },
    deleteUser: async (_: any, { id }: any) => {
      return deleteUser(id);
    },
  },
};
