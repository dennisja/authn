import { createYoga } from "graphql-yoga";
import { initContextCache } from "@pothos/core";
import { createServer } from "node:http";

import { PORT } from "./envs";
import { schema } from "./schema";
import { getCurrentUserFromAuthHeader } from "./utils/context";

const yoga = createYoga({
  schema,
  context: async ({ request }) => ({
    ...initContextCache(),
    currentUser: await getCurrentUserFromAuthHeader(
      request.headers.get("authorization") || ""
    ),
  }),
});

const server = createServer(yoga);

server.listen(PORT, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
