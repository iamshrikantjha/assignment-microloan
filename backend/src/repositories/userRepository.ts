import { prisma } from "./prismaClient";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(params: {
  email: string;
  password: string;
  fullName: string;
}) {
  return prisma.user.create({ data: params });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}


