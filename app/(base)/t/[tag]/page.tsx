import React from "react"

import { db } from "@/lib/db"
import { Post } from "@/components/Post"

interface TagsPageProps {
  params: {
    tag: string
  }
}

export default async function TagsPage({ params }: TagsPageProps) {
  const posts = await db.post.findMany({
    where: {
      tags: {
        some: {
          name: params.tag,
        },
      },
    },
    include: {
      tags: true,
      user: true,
      comments: true,
    },
  })

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3 pt-4 px-2">
        #{params.tag}
      </h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Post commentAmt={post.comments.length} post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
