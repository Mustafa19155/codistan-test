import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import User from "./model";

export const getUsers = async (page: number, limit: number, sortBy: string) => {
  try {
    return await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortBy);
  } catch (err) {}
};

export const getUser = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new GraphQLError("User already exists", {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
          http: {
            status: 400,
          },
        },
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    return await newUser.save();
  } catch (err) {}
};

export const updateUser = async (id: string, data: any) => {
  try {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
    });
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    throw new GraphQLError(err);
  }
};
