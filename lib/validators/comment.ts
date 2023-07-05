import { z } from "zod"

export const CommentValidator = z.object({
  postId: z.string(),
  content: z.string(),
})

export type CommentRequest = z.infer<typeof CommentValidator>
