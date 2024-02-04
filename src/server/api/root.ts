import { customerRouter } from "@/server/api/routers/customer";
import { createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "./routers/products";
import { sellOrderRouter } from "./routers/sell-order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  customer: customerRouter,
  product: productRouter,
  sellOrder: sellOrderRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
