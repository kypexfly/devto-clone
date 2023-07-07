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
      user: {
        username: params.username,
      },
    },
    include: {
      tags: true,
      user: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })

  if (!post) return notFound()

  if (session?.user.id != post.userId) return notFound()

  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="hidden lg:block lg:col-span-1 "></aside>
      <div className="overflow-hidden col-span-12 md:col-span-9 lg:col-span-8 bg-card rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <PostEditor
          initialValues={{
            title: post.title,
            cover: post.cover ?? undefined,
            tags: post.tags.map((tag) => tag.name),
            content: post.content,
          }}
          postId={post.id}
          authorId={post.userId}
        />
      </div>
      <div className="hidden md:flex flex-col md:col-span-3 gap-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader>Aditional info</CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Title must have between 10 and 80 characters.</li>
              <li>Tags must be between 1 and 4.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
