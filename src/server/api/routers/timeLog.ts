import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { timeLogHandler } from "../handlers/timeLog";
// import type { inferProcedureInput } from "@trpc/server";

// Define TimeLog input validation schema
const timeLogSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  stopTime: z.date(),
  recordTime: z.number(),
  description: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  isActive: z.boolean(),
  createdAt: z.date(),
});

const timeLogUpdateSchema = z
  .object({
    id: z.string(),
    data: timeLogSchema.omit({ id: true, createdAt: true, isActive: true }),
  })
  .refine(
    (data) => {
      return data.data.startTime <= data.data.stopTime;
    },
    {
      message: "Start time must be earlier then or equal to stop time",
      path: ["data", "startTime"],
    },
  );

export const timeLogRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await timeLogHandler.list(ctx.session.user.id);
  }),
  create: protectedProcedure
    .input(timeLogSchema.omit({ id: true, createdAt: true }))
    .mutation(async ({ ctx, input }) => {
      return await timeLogHandler.create({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
  update: protectedProcedure
    .input(timeLogUpdateSchema)
    .mutation(async ({ input }) => {
      return await timeLogHandler.update(input.id, {
        ...input.data,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await timeLogHandler.delete(input.id);
    }),
});
