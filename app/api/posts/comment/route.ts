import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { CommentValidator } from "@/lib/validators/comment"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()

    const { postId, content } = CommentValidator.parse(body)

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    await db.comment.create({
      data: {
        userId: session.user.id,
        postId,
        content,
      },
    })

    return new Response("OK")
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 400 })
    }

    return new Response(JSON.stringify(err), { status: 500 })
  }
}
