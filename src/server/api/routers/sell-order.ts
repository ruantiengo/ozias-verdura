/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { subDays } from 'date-fns'
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const orderItemCreateSchema = z.object({
    productId: z.number(),
    quantity: z.number().int().min(1),
    itemPrice: z.number().min(0),
});
export const sellOrderRouter = createTRPCRouter({

  create: publicProcedure
    .input(z.object({
      customerId: z.number(),
      totalPrice: z.number(),
      date: z.date(),
      orderItems: orderItemCreateSchema.array()
    }))

    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return ctx.db.sellOrder.create({
        data: {
          date: input.date,
          totalPrice: input.totalPrice,
          customerId: input.customerId,
          orderItems: {
            create: input.orderItems
          }
        },

      });

    }),

    getAll: publicProcedure.input(z.object({startDate: z.string().nullish(), endDate: z.string().nullish()})).query( async ({ ctx, input }) => {
      const tomorrow = new Date()
      tomorrow.setHours(0,0,0,0)
      const decrementedDate = subDays(tomorrow, 1);
     
      
      return ctx.db.sellOrder.findMany({ 
        include: {
          orderItems: true,
          customer: {
            select: {
              name: true,
            }
          },
         },
        where: {
          date: {
            lte: input.endDate ?? tomorrow,
            gte: input.startDate ?? decrementedDate
          }
        }
   
      },);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));


      return ctx.db.sellOrder.delete({
        where: {
          id: Number(input.id)
        }
      });
    }),
  
    deleteMany: publicProcedure
    .input(z.object({ ids: z.number().array() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));


      return ctx.db.sellOrder.deleteMany({
        where: {
          id: {
            in: input.ids
          },
        },
      });
    }),

    update: publicProcedure
    .input(z.object({
      id: z.number().min(1),
      customerId: z.number(),
      totalPrice: z.number(),
      date: z.date(),
      orderItems: orderItemCreateSchema.array()
    }))

    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return ctx.db.$transaction(async (trx) => {

        await trx.orderItem.deleteMany({
          where: {
            sellOrderId: input.id
          }
        })
        await trx.sellOrder.update({
            where: { id: input.id },
            data: {
                totalPrice: input.totalPrice,
                date: input.date,
                orderItems: {
                  create: input.orderItems
                }
            },
        });

 
    });

    }),

});
