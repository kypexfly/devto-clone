import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostValidator } from "@/lib/validators/post"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const session = await getAuthSession()
    const { title, tags, content } = PostValidator.parse(body)

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        tags: {
          create: tags.map((tagName) => ({ name: tagName.trim() })),
        },
        userId: session.user.id,
      },
    })

    return new Response(
      JSON.stringify({
        userId: post.userId,
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
