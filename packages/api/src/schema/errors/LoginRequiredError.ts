import { schemaBuilder } from "../builder";
import { ErrorInterface } from "./BaseError";

class LoginRequiredError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "LoginRequiredError";
  }
}

schemaBuilder.objectType(LoginRequiredError, {
  name: "LoginRequiredError",
  interfaces: [ErrorInterface],
});

export { LoginRequiredError };
