import { expect, test } from "vitest";
import { decodeToken, generateToken } from "../token";

test("generateToken should generate a token", () => {
  const token = generateToken({ age: 12 });
  expect(typeof token).toBe("string");
});

test("decodeToken should correctly decode a token", () => {
  const data = { id: 13 };
  const token = generateToken(data);
  expect(decodeToken<typeof data>(token)).toMatchObject(data);
});
