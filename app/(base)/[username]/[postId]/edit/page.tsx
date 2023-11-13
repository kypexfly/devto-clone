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

const PostTips = () => {
  return (
    <div className="hidden flex-col gap-3 md:col-span-3 md:flex">
      <Card className="w-full bg-white shadow-none dark:bg-zinc-900 md:rounded-lg">
        <CardHeader>
          <h2 className="font-bold tracking-tight">How to create a post?</h2>
        </CardHeader>
        <CardContent>
          <strong>Title</strong>
          <ul className="list-inside list-disc text-sm">
            <li>Make the title concise but descriptive.</li>
            <li>Make it catchy to attract attention.</li>
          </ul>
          <br />

          <strong>Tags</strong>
          <ul className="list-inside list-disc text-sm">
            <li>
              Include keywords that users might use to search for your post (up
              to 4 tags).
            </li>
          </ul>
          <br />

          <strong>Cover image URL</strong>
          <ul className="list-inside list-disc text-sm">
            <li>
              The cover image for your post will be displayed using a URL from
              Unsplash.
            </li>
          </ul>
          <br />

          <strong>Post Formatting</strong>
          <ul className="list-inside list-disc text-sm">
            <li>
              Break up long paragraphs into smaller ones to make the text easier
              to read.
            </li>
            <li>Use headers to organize your content and make it scannable.</li>
            <li>Use bold and italic formatting to emphasize key points.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
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
      <div className="col-span-12 overflow-hidden rounded-none border bg-white text-card-foreground dark:bg-zinc-900 md:col-span-9 md:rounded-lg lg:col-span-8">
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
      <PostTips />
    </div>
  )
}
