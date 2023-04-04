import { schemaBuilder } from "../builder";
import { prismaClient } from "../db";

schemaBuilder.prismaObject("UserProfile", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    otherNames: t.exposeString("otherNames", { nullable: true }),
    profileImageURL: t.exposeString("profileImageUrl", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    birthDay: t.expose("birthday", { type: "Date", nullable: true }),
    owner: t.relation("user"),
  }),
});

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
