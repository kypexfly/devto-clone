import { INITIAL_POSTS_RESULTS } from "@/config/post"
import { db } from "@/lib/db"

import PostFeed from "../PostFeed"

export async function GeneralFeed() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      cover: true,
      tags: true,
      comments: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INITIAL_POSTS_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}
