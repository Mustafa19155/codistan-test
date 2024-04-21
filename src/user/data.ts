import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import User from "./model";
import { redisClient } from "../redis";

export const getUsers = async (page: number, limit: number, sortBy: string) => {
  try {
    const cacheKey = `users:${page}:${limit}:${sortBy}`;

    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      console.log("in cache");
      let data = JSON.parse(cachedUsers);
      data.users = data.users.map((user: any) => new User(user));
      return data;
    }

    const users = await User.find()
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments();

    await redisClient.set(
      cacheKey,
      JSON.stringify({
        users,
        hasNext: total > page * limit,
      })
    );

    return {
      users,
      hasNext: total > page * limit,
    };
  } catch (err) {
    throw new GraphQLError(err);
  }
};

export const getUser = async (id: string) => {
  try {
    const cacheKey = `user:${id}`;

    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      console.log("User data retrieved from cache");
      let data = JSON.parse(cachedUser);
      return new User(data);
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    await redisClient.set(cacheKey, JSON.stringify(user));

    console.log("User data fetched from database");

    return user;
  } catch (err) {
    throw new GraphQLError(err);
  }
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
      throw new Error("User already exists");
      // throw new GraphQLError("User already exists", {
      //   extensions: {
      //     code: ApolloServerErrorCode.BAD_USER_INPUT,
      //     http: {
      //       status: 400,
      //     },
      //   },
      // });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    return await newUser.save();
  } catch (err) {
    throw new GraphQLError(err);
  }
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
