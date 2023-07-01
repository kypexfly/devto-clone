import { db } from "@/lib/db"
import { INITIAL_POSTS_RESULTS } from "@/config/post"

import PostFeed from "../PostFeed"

export async function GeneralFeed() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
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