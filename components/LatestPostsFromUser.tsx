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
    <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">More from {username}</h2>
      </CardHeader>
      <ul className="[&_a]:p-4 [&_a]:block text-sm">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/${username}/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
