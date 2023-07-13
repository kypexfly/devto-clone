import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Post } from "@/components/Post"

interface TagsPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({
  params,
}: TagsPageProps): Promise<Metadata> {
  return {
    title: `#${params.tag}`,
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
    <div className="mx-auto w-full max-w-screen-md">
      <h1 className="mb-3 scroll-m-20 px-2 pt-4 text-3xl font-bold tracking-tight lg:text-4xl">
        #{params.tag}
      </h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Post commentAmt={post.comments.length} post={post} />
          </li>
        ))}
        {posts.length === 0 && (
          <p className="px-2 py-4 text-gray-600">
            No posts found for this tag.
          </p>
        )}
      </ul>
    </div>
  )
}
