import { z } from "zod"

export const PostValidator = z.object({
  title: z.string().min(10).max(80),
  tags: z.array(z.string()).min(1).max(4),
  content: z.any(),
})

export const PostUpdateValidator = z.object({
  title: z.string().min(10).max(80),
  tags: z.array(z.string()).min(1).max(4),
  content: z.any(),
  postId: z.string(),
  userId: z.string(),
})

export type PostCreationRequest = z.infer<typeof PostValidator>
export type PostUpdateRequest = z.infer<typeof PostUpdateValidator>
