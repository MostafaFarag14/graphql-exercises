import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { schema } from "./schema";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  introspection: true,
});

server.listen().then((value) => {
  console.log(`🚀  Server ready at ${value.url}`);
});
