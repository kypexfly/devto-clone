import { Metadata } from "next"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Post } from "@/components/Post"

interface UserPageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: UserPageProps) {
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

  return {
    title: username,
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
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3 pt-4 px-2">
        All posts by {user.username}
      </h1>
      <ul>
        {user.posts.map((post, index) => (
          <li key={index}>
            <Post commentAmt={post.comments.length} post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
