import { schemaBuilder } from "../../builder";
import { prismaClient } from "../../db";

schemaBuilder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query) => {
      return prismaClient.user.findMany(query);
    },
  })
);
