import { describe, it, expect, vi } from "vitest";

// Mock the env module BEFORE importing stripe
vi.mock("@/env", () => ({
  env: {
    STRIPE_SECRET_KEY: "sk_test_mock",
    STRIPE_PRO_PRICE_ID: "price_mock_pro_123",
  },
}));

// Import the module under test
import { PLANS } from "./stripe";

describe("stripe helpers", () => {
  describe("PLANS", () => {
    it("exports PLANS correctly", () => {
      expect(PLANS).toBeDefined();
      expect(Object.keys(PLANS)).toContain("free");
      expect(Object.keys(PLANS)).toContain("pro");
    });

    it("has correct configuration for Free plan", () => {
      expect(PLANS.free.name).toBe("Free");
      expect(PLANS.free.price).toBe(0);
      expect(PLANS.free.priceId).toBeNull();
    });

    it("has correct configuration for Pro plan", () => {
      expect(PLANS.pro.name).toBe("Pro");
      expect(PLANS.pro.price).toBe(8);
      // This should match the mocked value
      expect(PLANS.pro.priceId).toBe("price_mock_pro_123");
    });
  });
});
