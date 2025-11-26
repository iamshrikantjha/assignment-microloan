import { calculateEmi } from "../src/services/loanService";

describe("loanService.calculateEmi", () => {
  it("calculates a positive EMI for valid inputs", () => {
    const emi = calculateEmi(100000, 12);
    expect(emi).toBeGreaterThan(0);
  });

  it("throws for non-positive principal", () => {
    expect(() => calculateEmi(0, 12)).toThrow();
  });

  it("throws for non-positive tenure", () => {
    expect(() => calculateEmi(100000, 0)).toThrow();
  });
});


