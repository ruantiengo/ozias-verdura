/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({

  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      sellPrice: z.number().min(1),
      buyPrice: z.number().min(1)
    }))

    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return ctx.db.product.create({
        data: {
          name: input.name,
          sellPrice: input.sellPrice,
          buyPrice: input.buyPrice
        },
      });

    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      orderBy: { createdAt: "asc" },
       where: {
        enabled: true
       }
    },);
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));


      return ctx.db.product.update({
        where: {
          id: Number(input.id)
        },
        data: {
          enabled: false
        }
      });
    }),
  
    deleteMany: publicProcedure
    .input(z.object({ ids: z.number().array() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));


      return ctx.db.product.updateMany({
        where: {
          id: {
            in: input.ids
          },
        },
        data: {
          enabled: false
        }

      });
    }),
  
});
