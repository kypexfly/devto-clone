import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { BookmarkValidator } from "@/lib/validators/bookmark"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    const body = await req.json()
    const { postId } = BookmarkValidator.parse(body)

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const existingBookmark = await db.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    })

    // Delete if it exists
    if (existingBookmark) {
      await db.bookmark.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
      })

      return new Response("UNSAVED")
    }

    // Create if it doesn't
    await db.bookmark.create({
      data: {
        userId: session.user.id,
        postId,
      },
    })

    return new Response("SAVED")
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 400 })
    }

    return new Response(JSON.stringify(err), { status: 500 })
  }
}
