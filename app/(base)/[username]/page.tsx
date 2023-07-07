import { Metadata } from "next"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Post } from "@/components/Post"
import { UserAvatar } from "@/components/UserAvatar"

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
          cover: true,
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
    title: `${username}'s profile`,
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
          cover: true,
          title: true,
          tags: true,
          user: true,
          comments: true,
        },
        take: 5,
      },
      details: true,
    },
  })

  if (!user) return notFound()

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <div className="bg-white dark:bg-zinc-900 md:rounded-xl p-6 mb-3 flex flex-col justify-center items-center">
        <UserAvatar user={user} className="h-24 w-24" />
        <ul className="p-2 w-full text-center">
          {user.details?.bio && <li>{user.details.bio}</li>}
          <div className="flex gap-6 justify-center p-2">
            {user.details?.location && <li>{user.details.location}</li>}
            {user.details?.website && (
              <li>
                <a
                  href={user.details.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </li>
            )}
          </div>
        </ul>
      </div>

      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3 pt-4 px-2">
        {`All posts by @${user.username}`}
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
