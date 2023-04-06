import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import ValidationPlugin from "@pothos/plugin-validation";
import type { User } from "@prisma/client";
import { DateTimeResolver, DateResolver } from "graphql-scalars";

import { prismaClient } from "./db";

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
}>({
  plugins: [
    PrismaPlugin,
    ErrorsPlugin, // this should appear before the validation plugin
    ValidationPlugin,
  ],
  prisma: { client: prismaClient },
  errorOptions: {
    defaultTypes: [Error],
  },
});

schemaBuilder.addScalarType("DateTime", DateTimeResolver, {});
schemaBuilder.addScalarType("Date", DateResolver, {});

schemaBuilder.queryType({});
schemaBuilder.mutationType({});

export { schemaBuilder };
