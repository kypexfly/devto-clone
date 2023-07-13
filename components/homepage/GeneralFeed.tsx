import { INITIAL_POSTS_RESULTS } from "@/config/post"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

import PostFeed from "../PostFeed"

export async function GeneralFeed() {
  const session = await getAuthSession()

  let bookmark
  if (!session) {
    bookmark = false
  } else {
    bookmark = {
      where: {
        userId: session?.user?.id,
      },
    }
  }

  const posts = await db.post.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      cover: true,
      tags: true,
      comments: true,
      bookmark,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INITIAL_POSTS_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}
