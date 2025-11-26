import {
  createLoanApplication,
  listLoanApplicationsForUser,
} from "../repositories/loanApplicationRepository";

export function calculateEmi(principal: number, tenureMonths: number): number {
  const annualRate = 0.12;
  const monthlyRate = annualRate / 12;
  const n = tenureMonths;

  if (n <= 0 || principal <= 0) {
    throw new Error("Principal and tenure must be positive");
  }

  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, n);
  const denominator = Math.pow(1 + monthlyRate, n) - 1;

  return Number((numerator / denominator).toFixed(2));
}

export async function applyForLoan(params: {
  userId: number;
  principal: number;
  tenureMonths: number;
  income: number;
}) {
  const emi = calculateEmi(params.principal, params.tenureMonths);

  // Business rule: Income must be at least 2x EMI
  const eligible = params.income >= 2 * emi;
  const status: "PENDING" | "APPROVED" | "REJECTED" = eligible
    ? "APPROVED"
    : "REJECTED";

  const application = await createLoanApplication({
    userId: params.userId,
    principal: params.principal,
    tenureMonths: params.tenureMonths,
    income: params.income,
    emi,
    status,
  });

  return application;
}

export async function getMyLoanApplications(userId: number) {
  return listLoanApplicationsForUser(userId);
}


