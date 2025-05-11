import "dotenv/config";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import typeDefs from "./graphql/schema/schema";
import resolvers from "./graphql/resolvers/index";

const secret = process.env.SECRET;
if (!secret) {
  throw new Error("SECRET must be defined in environment variables");
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export { server };
