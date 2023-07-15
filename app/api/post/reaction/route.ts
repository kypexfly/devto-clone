import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { ReactionValidator } from "@/lib/validators/reaction"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    const body = await req.json()
    const { postId } = ReactionValidator.parse(body)

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const existingReaction = await db.reaction.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    })

    let reaction
    const reactionCountSelector = {
      post: {
        select: {
          _count: {
            select: {
              reactions: true,
            },
          },
        },
      },
    }

    if (existingReaction) {
      // Delete if it exists
      reaction = await db.reaction.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
        include: reactionCountSelector,
      })
    } else {
      // Create if it doesn't
      reaction = await db.reaction.create({
        data: {
          userId: session.user.id,
          postId,
        },
        include: reactionCountSelector,
      })
    }

    return new Response(
      JSON.stringify({
        type: existingReaction ? "UNSAVED" : "SAVED",
        count: reaction.post?._count?.reactions,
      })
    )
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 400 })
    }

    return new Response(JSON.stringify(err), { status: 500 })
  }
}
