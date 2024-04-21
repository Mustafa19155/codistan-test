import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import mongoose from "mongoose";
import processJobs from "./worker";

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  formatError: (err) => {
    // Customize error message
    const message = err.message || "Internal server error";
    // Customize error status code
    const code = err.extensions?.code || 500;
    return { message, code };
  },
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

async function connectWithDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/codistan-test");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
processJobs();
connectWithDB();
startServer();
