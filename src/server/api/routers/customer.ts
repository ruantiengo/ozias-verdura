/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const customerRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), 
      email: z.string(), 
      phone: z.string(), 
      cep: z.string(),
      city: z.string(),
      district: z.string(),
      number: z.string(),
      street: z.string() }))

    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.customer.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          address: {
            create:  {
              cep: input.cep,
              city: input.city,
              district: input.district,
              number: input.number,
              street: input.street, 
            }
          }
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      orderBy: { createdAt: "asc" },
    });
  }),
});
