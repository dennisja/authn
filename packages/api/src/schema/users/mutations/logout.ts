import { AuthTokenStatus } from "@prisma/client";

import { assertLoginRequired } from "../../../utils/context";
import { schemaBuilder } from "../../builder";
import { prismaClient } from "../../db";
import { LoginRequiredError } from "../../errors/LoginRequiredError";

class LogoutResult {
  constructor(public userId: string, public token: string) {}
}

schemaBuilder.objectType(LogoutResult, {
  name: "LogoutResult",
  fields: (t) => ({
    token: t.exposeString("token", {
      description: "The token that is revoked after log out",
    }),
    userId: t.exposeID("userId", {
      description: "The id of the user that is logged ou",
    }),
  }),
});

schemaBuilder.mutationField("logout", (t) =>
  t.field({
    type: LogoutResult,
    description: "Logs out a user",
    errors: {
      types: [LoginRequiredError],
    },
    resolve: async (root, args, ctx) => {
      assertLoginRequired(ctx.currentUser);
      const token = await prismaClient.authToken.findFirstOrThrow({
        where: { token: ctx.authToken, status: AuthTokenStatus.ACTIVE },
      });
      await prismaClient.authToken.update({
        where: { id: token.id },
        data: { status: AuthTokenStatus.REVOKED },
      });
      return new LogoutResult(ctx.currentUser!.id, ctx.authToken);
    },
  })
);
