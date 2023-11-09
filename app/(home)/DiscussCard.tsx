import React from "react"
import Link from "next/link"

import { db } from "@/lib/db"
import { Card, CardHeader } from "@/components/ui/Card"

export async function DiscussCard() {
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
    <Card className="rounded-lg border-0 bg-transparent shadow-none">
      <CardHeader>
        <h2 className="text-xl font-semibold">#discuss</h2>
      </CardHeader>
      <ul className="space-y-2 text-sm [&_a]:block [&_a]:px-6 [&_a]:py-2">
        {posts.length === 0 && (
          <li className="px-6 py-3">
            <span className="text-base">No posts yet</span>
          </li>
        )}
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="border-l-4 hover:bg-accent hover:text-accent-foreground" href={`/${post.author.username}/${post.id}`}>
              <span className="text-base">{post.title}</span>
              <div>{post._count.comments} comments</div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
