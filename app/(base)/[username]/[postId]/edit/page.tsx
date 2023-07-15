import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"

import { PostEditor } from "./PostEditor"

import "@/styles/post-creator.css"

interface PostEditPageProps {
  params: {
    username: string
    postId: string
  }
}

export const metadata: Metadata = {
  title: "Edit post",
}

export default async function EditPage({ params }: PostEditPageProps) {
  const session = await getAuthSession()
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
      author: {
        username: params.username,
      },
    },
    include: {
      tags: true,
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })

  if (!post) return notFound()

  if (session?.user.id != post.authorId) return notFound()

  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="hidden lg:col-span-1 lg:block "></aside>
      <div className="col-span-12 overflow-hidden rounded-none bg-white text-card-foreground dark:bg-zinc-900 md:col-span-9 md:rounded-lg lg:col-span-8">
        <PostEditor
          initialValues={{
            title: post.title,
            cover: post.cover ?? undefined,
            tags: post.tags.map((tag) => tag.name),
            content: post.content,
          }}
          postId={post.id}
          authorId={post.authorId}
        />
      </div>
      <div className="hidden flex-col gap-3 md:col-span-3 md:flex">
        <Card className="w-full border-0 bg-white shadow-none dark:bg-zinc-900">
          <CardHeader>Aditional info</CardHeader>
          <CardContent>
            <ul className="list-inside list-disc">
              <li>Title must have between 10 and 80 characters.</li>
              <li>Tags must be between 1 and 4.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
