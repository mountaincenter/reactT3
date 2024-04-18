import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string().min(1),
          content: z.string().min(1),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      const post = await ctx.db.post.findUnique({
        where: { id },
      });

      if (!post || post.createdById !== ctx.session.user.id) {
        throw new Error(
          "Post not found or you are not authorized to update this post",
        );
      }

      return ctx.db.post.update({
        where: { id },
        data,
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
