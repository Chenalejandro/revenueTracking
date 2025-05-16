import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthenticated");
    }
    return {
      hello: `Hello, ${ctx.user.id}`,
    };
  }),
});
