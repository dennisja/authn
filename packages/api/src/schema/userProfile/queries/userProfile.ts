import { schemaBuilder } from "../../builder";
import { prismaClient } from "../../db";

schemaBuilder.queryField("userProfile", (t) =>
  t.prismaField({
    type: "UserProfile",
    args: {
      userId: t.arg.id({
        required: true,
        description: "The id of the user the profile belongs to",
      }),
    },
    resolve: async (query, root, args) => {
      return prismaClient.userProfile.findFirstOrThrow({
        where: { userId: args.userId as string },
      });
    },
  })
);
