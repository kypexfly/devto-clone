import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  PostCreateValidator,
  PostDeleteValidator,
  PostUpdateValidator,
} from "@/lib/validators/post"

// Create a post
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const session = await getAuthSession()
    const { title, cover, tags, content } = PostCreateValidator.parse(body)

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const post = await db.post.create({
      data: {
        title,
        cover,
        content,
        tags: {
          create: tags.map((tagName) => ({ name: tagName.trim() })),
        },
        userId: session.user.id,
      },
      include: {
        user: true,
      },
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

// Update a post
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

// Delete a post
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const { postId } = PostDeleteValidator.parse({ postId: id })
    const session = await getAuthSession()

    const postExist = await db.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!postExist) {
      return new Response("Post not found", { status: 404 })
    }

    if (session?.user.id != postExist.userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    await db.post.delete({
      where: {
        id: postId,
      },
    })

    return new Response("OK")
  } catch (err) {
    console.log(err)
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 400 })
    }

    return new Response(JSON.stringify(err), {
      status: 500,
    })
  }
}
