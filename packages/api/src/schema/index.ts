import { schemaBuilder } from "./builder";

import "./models/User";
import "./models/Profile";

const schema = schemaBuilder.toSchema({});

export { schema };
