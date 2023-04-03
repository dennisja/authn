import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from "graphql-scalars";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

import { prismaClient } from "./db";

const schemaBuilder = new SchemaBuilder<{
  Scalars: {
    DateTime: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({ plugins: [PrismaPlugin], prisma: { client: prismaClient } });

schemaBuilder.addScalarType("DateTime", DateTimeResolver, {});

schemaBuilder.queryType({});

export { schemaBuilder };
