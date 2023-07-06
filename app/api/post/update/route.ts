import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostUpdateValidator } from "@/lib/validators/post"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()

    const { title, cover, tags, content, postId, authorId } =
      PostUpdateValidator.parse(body)

    if (session?.user.id != authorId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const updatedPost = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        cover,
        // TODO: add tags in the update
        content,
      },
      include: {
        user: true,
      },
    })

    return new Response(
      JSON.stringify({
        username: updatedPost.user.username,
        postId: updatedPost.id,
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
