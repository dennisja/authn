import jwt from "jsonwebtoken";

import { AUTH_TOKEN_SECRET_KEY } from "../envs";

const generateToken = <Payload>(payload: Payload) => {
  return jwt.sign(payload as object, AUTH_TOKEN_SECRET_KEY, {
    algorithm: "RS256",
  });
};

const decodeToken = <Payload>(token: string): Payload => {
  try {
    const data = jwt.verify(token, AUTH_TOKEN_SECRET_KEY) as Payload;
    return data;
  } catch (error) {
    // TODO: log the error
    // TODO: throw a custom error
    throw error;
  }
};

export { generateToken, decodeToken };
