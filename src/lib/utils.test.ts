import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("handles conditional classes", () => {
      expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
      expect(cn("foo", true && "bar", "baz")).toBe("foo bar baz");
    });

    it("resolves tailwind conflicts", () => {
      expect(cn("p-4", "p-2")).toBe("p-2");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("handles empty/undefined/null values", () => {
      expect(cn("", undefined, null, "foo")).toBe("foo");
      expect(cn(undefined)).toBe("");
    });

    it("supports object syntax", () => {
      expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500");
    });
  });
});
