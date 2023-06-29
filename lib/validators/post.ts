import { z } from "zod"

export const PostValidator = z.object({
  title: z.string().min(10).max(80),
  tags: z.array(z.string()).min(1),
  content: z.any(),
})

export type PostCreationRequest = z.infer<typeof PostValidator>
