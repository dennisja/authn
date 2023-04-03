import { schemaBuilder } from "./builder";

import "./models/User";

const schema = schemaBuilder.toSchema({});

export { schema };
