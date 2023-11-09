import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostCreateValidator } from "@/lib/validators/post"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const session = await getAuthSession()

    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      })

    let whereClause = {}

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
        comments: true,
        author: true,
        bookmarks: {
          where: {
            userId: session?.user?.id,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 })
  }
}

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
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName.trim() },
            create: { name: tagName.trim() },
          })),
        },
        authorId: session.user.id,
      },
      include: {
        author: true,
      },
    })

    return new Response(
      JSON.stringify({
        username: post.author.username,
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
