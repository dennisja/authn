import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { User } from "@prisma/client";
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
  };
}>({ plugins: [PrismaPlugin], prisma: { client: prismaClient } });

schemaBuilder.addScalarType("DateTime", DateTimeResolver, {});
schemaBuilder.addScalarType("Date", DateResolver, {});

schemaBuilder.queryType({});
schemaBuilder.mutationType({});

export { schemaBuilder };
