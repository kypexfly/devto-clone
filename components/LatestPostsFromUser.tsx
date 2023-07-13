import Link from "next/link"

import { db } from "@/lib/db"
import { Card, CardHeader } from "@/components/ui/Card"

interface LatestPostsFromUserProps {
  userId: string
  username: string
}

export async function LatestPostsFromUser({
  userId,
  username,
}: LatestPostsFromUserProps) {
  const posts = await db.post.findMany({
    where: {
      userId,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  return (
    <Card className="w-full border-0 bg-white shadow-none dark:bg-zinc-900">
      <CardHeader>
        <h2 className="text-xl font-semibold">More from @{username}</h2>
      </CardHeader>
      <ul className="text-sm [&_a]:block [&_a]:px-6 [&_a]:py-3">
        {posts.map((post) => (
          <li key={post.id} className="border-t">
            <Link href={`/${username}/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
