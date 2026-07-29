import { formatNaira } from "../utils/amount";
import { formatUserDate } from "../utils/date";

describe("formatNaira", () => {
  it("formats numbers to Naira representation", () => {
    expect(formatNaira(200000)).toBe("₦200,000.00");
    expect(formatNaira(0)).toBe("₦0.00");
  });

  it("handles strings with numbers", () => {
    expect(formatNaira("150000.5")).toBe("₦150,000.50");
  });

  it("passes pre-formatted Naira values directly", () => {
    expect(formatNaira("₦100,000.00")).toBe("₦100,000.00");
  });

  it("handles null and undefined values", () => {
    expect(formatNaira(null)).toBe("₦0.00");
    expect(formatNaira(undefined)).toBe("₦0.00");
  });
});

describe("formatUserDate", () => {
  it("formats ISO date strings correctly", () => {
    expect(formatUserDate("2024-06-13T04:02:06.896Z")).toBe("Jun 13, 2024 4:02 AM");
  });

  it("handles invalid dates gracefully", () => {
    expect(formatUserDate("invalid-date-string")).toBe("");
    expect(formatUserDate(null)).toBe("");
  });
});
