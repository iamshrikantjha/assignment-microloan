import { prisma } from "./prismaClient";

export async function createLoanApplication(params: {
  userId: number;
  principal: number;
  tenureMonths: number;
  income: number;
  emi: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}) {
  return prisma.loanApplication.create({ data: params });
}

export async function listLoanApplicationsForUser(userId: number) {
  return prisma.loanApplication.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}


