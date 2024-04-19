import { describe, expect, test } from "bun:test";
import { compressZeros } from ".";

const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 12,
});
describe("compressZeros function", () => {
  test("should compress consecutive zeros in decimal part", () => {
    expect(compressZeros(formatter.format(0.000005))).toBe("$0.0_4_5");
    expect(compressZeros(formatter.format(0.0000000001))).toBe("$0.0_8_1");
    expect(compressZeros(formatter.format(12345.0000000002))).toBe(
      "$12,345.0_8_2"
    );
  });

  test("should handle different punctuation symbols", () => {
    expect(compressZeros(formatter.format(123.00002))).toBe("$123.0_3_2");
    expect(compressZeros(formatter.format(123.000000002))).toBe("$123.0_7_2");
  });

  test("should handle no consecutive zeros", () => {
    expect(compressZeros(formatter.format(123.45))).toBe("$123.45");
    expect(compressZeros(formatter.format(0.123))).toBe("$0.123");
  });

  test("should handle no decimal part", () => {
    expect(compressZeros(formatter.format(12345))).toBe("$12,345.00");
    expect(compressZeros(formatter.format(0))).toBe("$0.00");
  });

  test("should handle edge cases", () => {
    expect(compressZeros(formatter.format(0.000023))).toBe("$0.0_3_23");
    expect(compressZeros(formatter.format(0.01))).toBe("$0.01");
    expect(compressZeros(formatter.format(0.0))).toBe("$0.00");
  });
});
