import { notFound } from "next/navigation"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { Icons } from "@/components/Icons"
import { Post } from "@/components/Post"

export default async function BookmarksPage() {
  const session = await getAuthSession()

  if (!session?.user) return notFound()

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
          user: true,
          comments: true,
        },
      },
    },
  })

  return (
    <div className="pb-12">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3 pt-4 px-2">
        My Bookmarks
      </h1>
      <ul>
        {bookmarks.map((bkm, index) => (
          <li key={index}>
            <Post commentAmt={bkm.post.comments.length} post={bkm.post} />
          </li>
        ))}
      </ul>
      {!bookmarks.length && (
        <p className="pt-4 px-2">
          <Icons.bookmark size={24} className="inline-block" /> No bookmarks
          yet.
        </p>
      )}
    </div>
  )
}
