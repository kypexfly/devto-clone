import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { Icons } from "@/components/Icons"
import { Post } from "@/components/Post"

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Your saved posts",
}

export default async function BookmarksPage() {
  const session = await getAuthSession()

  if (!session?.user) return notFound()

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

  const bookmarks = await db.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      post: {
        select: {
          id: true,
          createdAt: true,
          title: true,
          tags: true,
          author: true,
          cover: true,
          comments: true,
          bookmarks: bookmark,
          _count: {
            select: {
              reactions: true
            }
          }
        },
      },
    },
  })

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <h1 className="mb-3 scroll-m-20 px-2 pt-4 text-3xl font-bold tracking-tight lg:text-4xl">
        <Icons.bookmark size={36} className="inline-block" /> My Bookmarks
      </h1>
      <ul className="space-y-2">
        {bookmarks.map((bkm, index) => (
          <li key={index}>
            <Post
              commentAmt={bkm.post.comments.length}
              post={bkm.post}
              bookmarked={!!bkm.post?.bookmarks?.length}
            />
          </li>
        ))}
      </ul>
      {!bookmarks.length && <p className="px-2 pt-4">No bookmarks yet.</p>}
    </div>
  )
}
