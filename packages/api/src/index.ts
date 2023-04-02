import { createSchema, createYoga } from "@graphql-yoga/node";
import { createServer } from "node:http";
import { PORT } from "./envs";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /*GraphQL*/ `
    type Query {
        hello: String!
    }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello World",
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(PORT, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
