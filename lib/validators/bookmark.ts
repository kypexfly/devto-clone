import { z } from "zod"

export const BookmarkValidator = z.object({
  postId: z.string(),
})

export type BookmarkRequest = z.infer<typeof BookmarkValidator>
