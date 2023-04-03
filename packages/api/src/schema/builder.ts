import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";

const schemaBuilder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({});

schemaBuilder.addScalarType("Date", DateResolver, {});

export { schemaBuilder };
