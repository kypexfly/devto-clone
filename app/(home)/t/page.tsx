import { Metadata } from "next"
import Link from "next/link"

import { db } from "@/lib/db"
import { Tag } from "@/components/Tag"

export const metadata: Metadata = {
  title: "Tags",
}

export default async function TagsPage() {
  const tags = await db.tag.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    take: 50,
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <h1 className="mb-3 scroll-m-20 px-4 pt-4 text-3xl font-bold tracking-tight lg:text-4xl">
        Most popular tags
      </h1>
      <ul className="flex flex-wrap items-center gap-3 px-4">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/t/${tag.name}`}>
              <Tag>{`${tag.name} (${tag._count.posts})`}</Tag>
            </Link>
          </li>
        ))}

        {tags.length === 0 && (
          <li className="px-2 py-4 text-gray-600">No tags found.</li>
        )}
      </ul>
    </div>
  )
}
