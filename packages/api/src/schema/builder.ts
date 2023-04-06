import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver, DateResolver } from "graphql-scalars";

import { prismaClient } from "./db";

import type { User } from "@prisma/client";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

const schemaBuilder = new SchemaBuilder<{
  Scalars: {
    DateTime: { Input: Date; Output: Date };
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
  Context: {
    currentUser: User | null;
  };
}>({
  plugins: [ErrorsPlugin, PrismaPlugin],
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
