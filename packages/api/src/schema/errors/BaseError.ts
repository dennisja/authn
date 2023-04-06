import { schemaBuilder } from "../builder";

const ErrorInterface = schemaBuilder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});

schemaBuilder.objectType(Error, {
  name: "BaseError",
  interfaces: [ErrorInterface],
});

export { ErrorInterface };
