import { AuthTokenStatus } from "@prisma/client";
import type { User } from "@prisma/client";

import { prismaClient } from "../schema/db";
import { LoginRequiredError } from "../schema/errors/LoginRequiredError";
import type { AuthTokenPayload } from "../schema/users/types";
import { decodeToken } from "./token";

const extractTokenFromHeader = (header: string): string =>
  header.replace("Bearer ", "").trim();

const getCurrentUserFromAuthHeader = async (
  token: string
): Promise<User | null> => {
  if (!token) return null; // user is not logged in

  const tokenPayload = decodeToken<AuthTokenPayload>(token);

  const validTokenFromDB = await prismaClient.authToken.findFirst({
    where: { token, status: AuthTokenStatus.ACTIVE, userId: tokenPayload.id },
    include: {
      user: true,
    },
  });
  return validTokenFromDB?.user ?? null;
};

const LOGIN_REQUIRED_MESSAGE =
  "You have to be logged in to perform this operation";

const assertLoginRequired = (user: User | null): boolean => {
  // if (!user) throw new LoginRequiredError(LOGIN_REQUIRED_MESSAGE);
  // return true;
  return Boolean(user)
};

export {
  assertLoginRequired,
  extractTokenFromHeader,
  getCurrentUserFromAuthHeader,
};
