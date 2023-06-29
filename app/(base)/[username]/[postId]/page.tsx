import Image from "next/image"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader } from "@/components/ui/Card"
import { Icons } from "@/components/Icons"
import Tag from "@/components/Tag"
import { UserAvatar } from "@/components/UserAvatar"

import "@/styles/mdx.css"
import "highlight.js/styles/github-dark.css"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import CustomMDXRemote from "@/components/CustomMDXRemote"


interface PostPageProps {
  params: {
    postId: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      tags: true,
      user: true,
    },
  })

  if (!post) return notFound()

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-1 ">
        <div className="sticky top-20 flex flex-col gap-3">
          <Button className="py-6" variant="ghost">
            <Icons.heart />
          </Button>
          <Button className="py-6" variant="ghost">
            <Icons.comment />
          </Button>
        </div>
      </aside>
      <div className="overflow-hidden col-span-8 bg-card rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <AspectRatio ratio={100 / 42} className="relative">
          <Image
            fill
            className="object-cover"
            loading="lazy"
            alt=""
            src="https://images.unsplash.com/photo-1578589318433-39b5de440c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
          />
        </AspectRatio>
        <div className="p-12">
          <h1 className="scroll-m-20 mb-3 text-5xl font-extrabold tracking-tight lg:text-6xl">
            {post.title}
          </h1>

          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag.name} href={`/t/${tag.name}`}>
                <Tag>{tag.name}</Tag>
              </Link>
            ))}
          </ul>

          <UserAvatar user={post.user} className="mt-4" />

          <div className="mdx text-lg">
            <CustomMDXRemote source={post.content} />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0">
          <CardHeader>About Author</CardHeader>
        </Card>
      </div>
    </div>
  )
}
