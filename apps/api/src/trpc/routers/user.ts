import { updateUserSchema } from "@api/schemas/users";
import { resend } from "@api/services/resend";
import { createTRPCRouter, protectedProcedure } from "@api/trpc/init";
import { teamCache } from "@midday/cache/team-cache";
import {
  deleteUser,
  getUserById,
  getUserInvites,
  updateUser,
} from "@midday/db/queries";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    return getUserById(db, session.user.id);
  }),

  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx: { db, session }, input }) => {
      // Clear team permission cache when switching teams
      if (input.teamId) {
        await teamCache.delete(`user:${session.user.id}:team:${input.teamId}`);
      }

      return updateUser(db, {
        id: session.user.id,
        ...input,
      });
    }),

  delete: protectedProcedure.mutation(
    async ({ ctx: { supabase, db, session } }) => {
      const [data] = await Promise.all([
        deleteUser(db, session.user.id),
        supabase.auth.admin.deleteUser(session.user.id),
        resend.contacts.remove({
          email: session.user.email!,
          audienceId: process.env.RESEND_AUDIENCE_ID!,
        }),
      ]);

      return data;
    },
  ),

  invites: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    if (!session.user.email) {
      return [];
    }

    return getUserInvites(db, session.user.email);
  }),
});
