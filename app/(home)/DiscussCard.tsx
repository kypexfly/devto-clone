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
      user: true,
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
    <Card className="rounded-lg border-0 bg-white shadow-none dark:bg-zinc-900">
      <CardHeader>
        <h2 className="text-xl font-semibold">#discuss</h2>
      </CardHeader>
      <ul className="text-sm [&_a]:block [&_a]:px-6 [&_a]:py-3">
        {posts.map((post) => (
          <li key={post.id} className="border-t">
            <Link href={`/${post.user.username}/${post.id}`}>
              <span className="text-base">{post.title}</span>
              <div className="">{post._count.comments} comments</div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
