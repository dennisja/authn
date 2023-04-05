import { AuthTokenStatus } from "@prisma/client";
import { schemaBuilder } from "../../builder";

schemaBuilder.enumType(AuthTokenStatus, {
  name: "AuthTokenStatus",
  description: "The status of the token which we use to authorize the user",
});

schemaBuilder.prismaObject("AuthToken", {
  name: "AuthToken",
  fields: (t) => ({
    id: t.exposeID("id"),
    status: t.expose("status", { type: AuthTokenStatus }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    user: t.relation("user"),
  }),
});
