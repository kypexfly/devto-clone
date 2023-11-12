import { Suspense } from "react"
import Link from "next/link"

import { db } from "@/lib/db"
import { Card, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export async function DiscussCard() {
  return (
    <Card className="rounded-lg border-0 bg-transparent shadow-none">
      <CardHeader>
        <h2 className="text-xl font-semibold">#discuss</h2>
      </CardHeader>

      <ul className="flex flex-col gap-2 [&_a]:block [&_a]:px-6 [&_a]:py-2">
        <Suspense fallback={<DiscussListSkeleton />}>
          <DiscussList />
        </Suspense>
      </ul>
    </Card>
  )
}

const DiscussList = async () => {
  const posts = await db.post.findMany({
    where: {
      tags: {
        some: {
          name: "discuss",
        },
      },
    },
    include: {
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  return (
    <>
      {posts.length === 0 && (
        <li className="px-6 py-3">
          <span className="text-base">No posts yet</span>
        </li>
      )}

      {posts.map((post) => (
        <li key={post.id}>
          <Link
            className="border-l-4 hover:bg-accent hover:text-accent-foreground"
            href={`/${post.author.username}/${post.id}`}
          >
            <span>{post.title}</span>
            <div className="text-sm text-muted-foreground">
              {post._count.comments} comments
            </div>
          </Link>
        </li>
      ))}
    </>
  )
}

const DiscussListSkeleton = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <li key={index}>
            <div className="space-y-2 border-l-4 px-6 py-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </li>
        ))}
    </>
  )
}
