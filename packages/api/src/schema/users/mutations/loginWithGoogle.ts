import {
  AuthType,
  User,
  UserProfile,
  UserRegistrationStatus,
} from "@prisma/client";
import { OAuth2Client } from "google-auth-library";

import { prismaClient } from "../../db";
import { GOOGLE_AUTH_CLIENT_ID } from "../../../envs";
import { schemaBuilder } from "../../builder";

const oAuthClient = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);

type LoginResultUser = (User & { profile: UserProfile | null }) | null;

class LoginResult {
  constructor(public token: string, public user: LoginResultUser) {}
}

schemaBuilder.objectType(LoginResult, {
  name: "LoginResult",
  description: "The result when a user successfully logs in",
  fields: (t) => ({
    user: t.prismaField({
      type: "User",
      description: "The details of the user we have logged in",
      resolve: async (query, root) => {
        return root.user!;
      },
    }),
    token: t.exposeString("token", {
      description: "The token to use when authorizing a user",
    }),
  }),
});

schemaBuilder.mutationField("loginWithGoogle", (t) =>
  t.field({
    type: LoginResult,
    description: "The result of a successful login",
    args: {
      credential: t.arg.string({
        required: true,
        description:
          "The token containing user information generated after login from the google api",
      }),
    },
    resolve: async (root, args) => {
      const ticket = await oAuthClient.verifyIdToken({
        idToken: args.credential,
        audience: GOOGLE_AUTH_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload) throw new Error("Invalid login credentials");

      let user = await prismaClient.user.findFirst({
        where: { email: payload.email },
        include: { profile: true },
      });

      // create the user if they do not exist
      if (!user) {
        user = await prismaClient.user.create({
          data: {
            email: payload.email!,
            authType: AuthType.GOOGLE,
            registrationStatus: UserRegistrationStatus.ACTIVATED,
            profile: {
              create: {
                firstName: payload.given_name || "",
                lastName: payload.family_name || "",
                profileImageUrl: payload.picture,
              },
            },
          },
          include: { profile: true },
        });
      }

      // TODO: maybe generate app internal auth token

      // we return the google token after verifying that its valid
      return new LoginResult(args.credential, user);
    },
  })
);
