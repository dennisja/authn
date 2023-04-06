import { assertLoginRequired } from "../../../utils/context";
import { schemaBuilder } from "../../builder";
import { prismaClient } from "../../db";

schemaBuilder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, root, args, ctx) => {
      assertLoginRequired(ctx.currentUser);
      return prismaClient.user.findMany(query);
    },
  })
);
