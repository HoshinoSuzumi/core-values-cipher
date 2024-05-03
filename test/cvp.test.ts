import { describe, it, expect } from "vitest";
import { encrypt, descrypt } from "../src";

describe("cvp", () => {
  const text = "Hello, World!";

  it("should be encrypted and descrypted", () => {
    const cipher = encrypt(text);
    console.log("cipher", cipher);
    expect(descrypt(cipher)).toBe(text);
  });
});
