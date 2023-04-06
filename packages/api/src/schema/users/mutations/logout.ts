import { AuthTokenStatus } from "@prisma/client";

import { assertLoginRequired } from "../../../utils/context";
import { schemaBuilder } from "../../builder";
import { prismaClient } from "../../db";

class LogoutResult {
  constructor(public userId: string, public token: string) {}
}

schemaBuilder.mutationField("logout", (t) =>
  t.field({
    type: LogoutResult,
    description: "Logs out a user",
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
