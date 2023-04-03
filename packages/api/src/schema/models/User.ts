import { UserRegistrationStatus } from "@prisma/client";

import { schemaBuilder } from "../builder";
import { prismaClient } from "../db";

schemaBuilder.enumType(UserRegistrationStatus, {
  name: "UserRegistrationStatus",
});

schemaBuilder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    joinedAt: t.expose("joinedAt", { type: "DateTime" }),
    registrationStatus: t.expose("registrationStatus", {
      type: UserRegistrationStatus,
    }),
    profile: t.relation("profile"),
  }),
});

schemaBuilder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query) => {
      return prismaClient.user.findMany(query);
    },
  })
);
