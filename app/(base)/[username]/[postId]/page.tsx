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
import { Icons } from "@/components/Icons"
import { Tag } from "@/components/Tag"

import "@/styles/mdx.css"
import "highlight.js/styles/github-dark.css"

import { getAuthSession } from "@/lib/auth"
import { CommentSection } from "@/components/CommentSection"
import { CustomMDXRemote } from "@/components/CustomMDXRemote"
import { LatestPostsFromUser } from "@/components/LatestPostsFromUser"
import { PostAuthor } from "@/components/PostAuthor"
import { UserAvatar } from "@/components/UserAvatar"

import "@/styles/mdx.css"

interface PostCreatorPageProps {
  params: {
    username: string
    postId: string
  }
}

export default async function PostCreatorPage({
  params,
}: PostCreatorPageProps) {
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
      user: {
        include: {
          details: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })

  if (!post) return notFound()

  return (
    <div className="grid grid-cols-12 gap-3">
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
        {post.cover && (
          <AspectRatio ratio={100 / 42} className="relative">
            <Image
              fill
              className="object-cover"
              loading="lazy"
              alt=""
              src={post.cover}
            />
          </AspectRatio>
        )}
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

          {post.userId === session?.user.id && (
            <div className="flex justify-end">
              <Link
                href={`/${post.user.username}/${post.id}/edit`}
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                <Icons.edit className="inline mr-2" size={14} />
                Edit
              </Link>
            </div>
          )}
        </div>

        <Suspense fallback={<>Loading...</>}>
          <CommentSection postId={post.id} />
        </Suspense>
      </div>

      <div className="hidden lg:flex flex-col lg:col-span-3 gap-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader className="-mt-8 flex items-center">
            <Link href={`/${post.user.username}`}>
              <UserAvatar user={post.user} className="h-16 w-16" />
            </Link>
            <h2 className="text-xl font-semibold">
              <Link
                href={`/${post.user.username}`}
              >{`@${post.user.username}`}</Link>
            </h2>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              {post.user.details?.bio || (
                <>{post.user.username} has no description.</>
              )}
            </p>
            {post.user.details?.location && (
              <p>
                <strong>Location:</strong> {post.user.details.location}
              </p>
            )}
            {post.user.details?.website && (
              <p>
                <a
                  className={buttonVariants({ variant: "secondary" })}
                  target="_blank"
                  rel="noreferrer"
                  href={post.user.details.website}
                >
                  Website
                </a>
              </p>
            )}
          </CardContent>
        </Card>

        <LatestPostsFromUser
          userId={post.userId}
          username={post.user.username as string}
        />

        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full sticky top-20">
          <CardHeader>
            <h2 className="text-xl font-semibold">Table of content (To do)</h2>
          </CardHeader>
          <ul className="[&_a]:p-4 [&_a]:block text-sm">
            <li>
              <Link href={`#heading`}>Heading title 1</Link>
            </li>
            <li>
              <Link href={`#heading`}>Heading title 2</Link>
            </li>
            <li>
              <Link href={`#heading`}>Heading title 3</Link>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
