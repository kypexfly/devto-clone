import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostDeleteValidator, PostUpdateValidator } from "@/lib/validators/post"

type Params = {
  params: { id: string }
}

export async function PATCH(req: Request, { params }: Params) {
  const postId = params.id

  try {
    const body = await req.json()
    const session = await getAuthSession()

    const { title, cover, tags, content, authorId } = PostUpdateValidator.parse(
      { ...body, postId }
    )

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
        tags: {
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
          set: tags.map((tagName) => ({ name: tagName })),
        },
        content,
      },
      include: {
        author: true,
      },
    })

    revalidatePath(`/${session.user.username}/${postId}`)

    return new Response(
      JSON.stringify({
        username: updatedPost.author.username,
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

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = params.id

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

    if (session?.user.id != postExist.authorId) {
      return new Response("Unauthorized", { status: 401 })
    }

    await db.post.delete({
      where: {
        id: postId,
      },
    })

    return new Response("OK")
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 400 })
    }

    return new Response(JSON.stringify(err), {
      status: 500,
    })
  }
}
