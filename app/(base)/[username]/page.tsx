import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Icons } from "@/components/Icons"
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
          author: true,
          comments: true,
        },
        take: 5,
      },
    },
  })

  if (!user) return notFound()

  return {
    title: `@${username}'s profile`,
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
          author: true,
          comments: true,
          bookmarks: true,
          _count: {
            select: {
              reactions: true,
            },
          },
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      },
      details: true,
    },
  })

  if (!user) return notFound()

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <div className="mb-3 flex flex-col items-center justify-center bg-white p-6 dark:bg-zinc-900 md:rounded-lg">
        <UserAvatar user={user} className="h-24 w-24" />
        <h2 className="text-xl font-semibold">{`@${user.username}`}</h2>
        <ul className="w-full p-2 text-center">
          {user.details?.bio && <li>{user.details.bio}</li>}
          <div className="flex justify-center gap-6 p-2">
            {user.details?.location && (
              <li>
                <Icons.map className="mr-1 inline-block h-5 w-5" />
                {user.details.location}
              </li>
            )}
            {user.details?.website && (
              <li>
                <a
                  href={user.details.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.globe className="mr-1 inline-block h-5 w-5" />
                  Website
                </a>
              </li>
            )}
          </div>
        </ul>
      </div>

      <h1 className="mb-3 scroll-m-20 px-2 pt-4 text-3xl font-bold tracking-tight lg:text-4xl">
        {`All posts by @${user.username}`}
      </h1>
      <ul>
        {user.posts.map((post, index) => (
          <li key={index}>
            <Post
              commentAmt={post.comments.length}
              post={post}
              bookmarked={!!post?.bookmarks?.length}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
