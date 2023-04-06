import { assertLoginRequired } from "../../../utils/context";
import { schemaBuilder } from "../../builder";
import { prismaClient } from "../../db";
import { LoginRequiredError } from "../../errors/LoginRequiredError";

schemaBuilder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    errors: {
      types: [LoginRequiredError],
    },
    resolve: async (query, root, args, ctx) => {
      assertLoginRequired(ctx.currentUser);
      return prismaClient.user.findMany(query);
    },
  })
);
