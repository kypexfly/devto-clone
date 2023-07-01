import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Post } from "@/components/Post"

interface UserPageProps {
  params: {
    username: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params

  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      posts: {
        select: {
          id: true,
          createdAt: true,
          title: true,
          tags: true,
          user: true,
          comments: true,
        },
        take: 5,
      },
    },
  })

  if (!user) return notFound()

  return (
    <div>
      <ul>
        {user.posts.map((post, index) => (
          <Post commentAmt={post.comments.length} post={post} key={index} />
        ))}
      </ul>
    </div>
  )
}
