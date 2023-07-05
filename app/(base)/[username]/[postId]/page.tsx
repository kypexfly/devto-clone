import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import "highlight.js/styles/github-dark.css"

import { DEFAULT_POST_COVER } from "@/config/post"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { CommentSection } from "@/components/CommentSection"
import { CustomMDXRemote } from "@/components/CustomMDXRemote"
import { Icons } from "@/components/Icons"
import { LatestPostsFromUser } from "@/components/LatestPostsFromUser"
import { PostAuthor } from "@/components/PostAuthor"
import { Tag } from "@/components/Tag"
import { UserAvatar } from "@/components/UserAvatar"

import "@/styles/mdx.css"

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
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })

  if (!post) return notFound()

  return (
    <div className="grid grid-cols-12 gap-3 grow">
      <aside className="hidden md:block md:col-span-1 ">
        <div className="sticky top-20 flex flex-col gap-4">
          <Button
            className="flex flex-col items-center gap-2 p-2 md:py-4 h-auto"
            variant="ghost"
          >
            <Icons.heart />0
          </Button>
          <Link
            href="#comments"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex flex-col items-center gap-2 p-2 md:py-4 h-auto"
            )}
          >
            <Icons.comment />
            {post._count.comments}
          </Link>
        </div>
      </aside>
      <div className="overflow-hidden col-span-12 md:col-span-11 lg:col-span-8 bg-card rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <AspectRatio ratio={100 / 42} className="relative">
          <Image
            fill
            className="object-cover"
            loading="lazy"
            alt=""
            src={post.cover || DEFAULT_POST_COVER}
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

          <div className="mdx py-4 text-lg">
            <CustomMDXRemote source={post.content} />
          </div>
        </div>

        <Suspense fallback={<>Loading...</>}>
          <CommentSection postId={post.id} />
        </Suspense>
      </div>

      <div className="hidden lg:flex flex-col lg:col-span-3 gap-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader className="-mt-8 flex items-center">
            <UserAvatar user={post.user} className="h-16 w-16" />
            <h2 className="text-xl font-semibold">
              <Link
                href={`/${post.user.username}`}
              >{`@${post.user.username}`}</Link>
            </h2>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {post.user.username} has no description.
          </CardContent>
        </Card>

        <LatestPostsFromUser
          userId={post.userId}
          username={post.user.username as string}
        />

        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full sticky top-20">
          <CardHeader>
            <h2 className="text-xl font-semibold">Table of content</h2>
          </CardHeader>
          <ul className="[&_a]:p-4 [&_a]:block text-sm">
            <li>
              <Link href={`#heading`}>h1</Link>
            </li>
            <li>
              <Link href={`#heading`}>h2</Link>
            </li>
            <li>
              <Link href={`#heading`}>h3</Link>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
