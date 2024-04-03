import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TimeLogData {
  id: string;
  startTime: Date;
  stopTime: Date;
  recordTime: number;
  description?: string | null;
  category?: string | null;
  status?: string | null;
  isActive: boolean;
  createdAt: Date;
  userId: string;
}

export const timeLogHandler = {
  list: async (userId: string) =>
    prisma.timeLog.findMany({ where: { userId } }),
  create: async (data: Omit<TimeLogData, "id" | "createdAt">) =>
    prisma.timeLog.create({ data: { ...data } }),
  update: async (
    id: string,
    data: Omit<TimeLogData, "id" | "createdAt" | "userId">,
  ) => prisma.timeLog.update({ where: { id }, data: { ...data } }),
  delete: async (id: string) => prisma.timeLog.delete({ where: { id } }),
};
