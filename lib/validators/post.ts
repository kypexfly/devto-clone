import { z } from "zod"

const coverValidation = z
  .string()
  .url()
  .refine((value) => {
    try {
      const url = new URL(value)
      return url.hostname === "images.unsplash.com"
    } catch {
      return false
    }
  }, "URL must be from unsplash.com")
  .optional()

export const PostCreateValidator = z.object({
  title: z.string().min(10).max(80),
  cover: coverValidation,
  tags: z.array(z.string()).min(1).max(4),
  content: z.any(),
})

export const PostUpdateValidator = z.object({
  title: z.string().min(10).max(80),
  cover: coverValidation,
  tags: z.array(z.string()).min(1).max(4),
  content: z.any(),
  postId: z.string(),
  authorId: z.string(),
})

export const PostDeleteValidator = z.object({
  postId: z.string(),
})

export type PostCreationRequest = z.infer<typeof PostCreateValidator>
export type PostUpdateRequest = z.infer<typeof PostUpdateValidator>
export type PostDeleteRequest = z.infer<typeof PostDeleteValidator>
