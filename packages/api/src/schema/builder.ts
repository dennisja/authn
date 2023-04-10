import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";
import type { User } from "@prisma/client";
import { DateTimeResolver, DateResolver } from "graphql-scalars";

import { prismaClient } from "./db";
import { assertLoginRequired } from "../utils/context";

const schemaBuilder = new SchemaBuilder<{
  Scalars: {
    DateTime: { Input: Date; Output: Date };
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
  Context: {
    currentUser: User | null;
    authToken: string;
  };
  AuthScopes: {
    isLoggedIn: boolean;
  };
}>({
  plugins: [
    ScopeAuthPlugin, // should appear before most of the plugins to ensure that authorization is handled correctly
    PrismaPlugin,
    ErrorsPlugin, // this should appear before the validation plugin
    ValidationPlugin,
  ],
  prisma: { client: prismaClient },
  errorOptions: {
    defaultTypes: [Error],
  },
  authScopes: async (context) => ({
    isLoggedIn: () => assertLoginRequired(context.currentUser),
  }),
  scopeAuthOptions: {
    // Recommended when using subscriptions
    // when this is not set, auth checks are run when event is resolved rather than when the subscription is created
    authorizeOnSubscribe: true,
  },
});

schemaBuilder.addScalarType("DateTime", DateTimeResolver, {});
schemaBuilder.addScalarType("Date", DateResolver, {});

schemaBuilder.queryType({});
schemaBuilder.mutationType({});

export { schemaBuilder };
