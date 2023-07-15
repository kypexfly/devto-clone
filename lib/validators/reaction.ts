import { z } from "zod"

export const ReactionValidator = z.object({
  postId: z.string(),
})

export type ReactionRequest = z.infer<typeof ReactionValidator>
