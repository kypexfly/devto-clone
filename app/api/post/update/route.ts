import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostValidator } from "@/lib/validators/post"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const session = await getAuthSession()
    const { title, tags, content } = PostValidator.parse(body)

    if (session?.user.id != post.user.id) {
      return new Response("Unauthorized", { status: 401 })
    }

    const postExist = await db.post.findUnique({
      title,
      content,
      tags,
    })

    return new Response(
      JSON.stringify({
        username: post.user.username,
        postId: post.id,
      })
    )
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 400 })
    }

    return new Response(JSON.stringify(err), {
      status: 500,
    })
  }
}
