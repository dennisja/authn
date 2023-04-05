import { schemaBuilder } from "./builder";

import "./userProfile";
import "./users";

const schema = schemaBuilder.toSchema({});

export { schema };
