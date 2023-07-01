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
import { PostAuthor } from "@/components/PostAuthor"

interface PostPageProps {
  params: {
    username: string
    postId: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
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
      comments: true,
    },
  })

  if (!post) return notFound()

  return (
    <div className="grid grid-cols-12 gap-3 grow">
      <aside className="hidden md:block md:col-span-1 ">
        <div className="sticky top-20 flex flex-col gap-4">
          <Button className="p-2 md:py-6" variant="ghost">
            <Icons.heart />
          </Button>
          <Button className="p-2 md:py-6" variant="ghost">
            <Icons.comment />
          </Button>
        </div>
      </aside>
      <div className="overflow-hidden col-span-12 md:col-span-11 lg:col-span-8 bg-card rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <AspectRatio ratio={100 / 42} className="relative">
          <Image
            fill
            className="object-cover"
            loading="lazy"
            alt=""
            src="https://images.unsplash.com/photo-1578589318433-39b5de440c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
          />
        </AspectRatio>
        <div className="p-4 md:p-12">
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

          <PostAuthor
            user={post.user}
            createdAt={post.createdAt}
            className="py-4"
          />

          <div className="mdx text-lg">
            <CustomMDXRemote source={post.content} />
          </div>
        </div>
        <section id="comments" className="p-4 md:p-12 border-t">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {`Comments (${post.comments.length})`}
          </h2>

          <ul>
            {post.comments.map((c, index) => (
              <li>
                <p>@{`${c.userId} / ${c.createdAt.toDateString()}`}</p>
                <p>{c.content}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="hidden lg:flex flex-col lg:col-span-3 gap-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader>User Card</CardHeader>
        </Card>
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader>More from {post.user.username}</CardHeader>
        </Card>
      </div>
    </div>
  )
}
