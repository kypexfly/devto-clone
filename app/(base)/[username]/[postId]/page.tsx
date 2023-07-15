import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getAuthSession } from "@/lib/auth"
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
import "highlight.js/styles/github-dark.css"

import { Metadata } from "next"

import { BookmarkButton } from "@/components/BookmarkButton"
import { ReactionButton } from "@/components/ReactionButton"

import { DeletePostButton } from "./DeletePostButton"

interface PostCreatorPageProps {
  params: {
    username: string
    postId: string
  }
}

export async function generateMetadata({
  params,
}: PostCreatorPageProps): Promise<Metadata> {
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

  return {
    title: post?.title,
  }
}

export default async function PostCreatorPage({
  params,
}: PostCreatorPageProps) {
  const session = await getAuthSession()

  let bookmark, reaction

  if (!session) {
    bookmark = false
    reaction = false
  } else {
    ;(bookmark = {
      where: {
        userId: session?.user?.id,
      },
    }),
      (reaction = {
        where: {
          userId: session?.user?.id,
        },
      })
  }

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
      bookmarks: bookmark,
      reactions: reaction,
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
    },
  })

  if (!post) return notFound()

  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="fixed bottom-0 z-[1] w-full border-t border-t-border/25 bg-background/50 backdrop-blur-md md:relative md:col-span-1 md:block md:bg-transparent md:backdrop-blur-0 ">
        <div className="sticky bottom-0 flex justify-between md:top-20 md:flex-col md:gap-4">
          <ReactionButton
            postId={post.id}
            count={post?._count?.reactions}
            initialState={!!post?.reactions?.length}
          />
          <Link
            href="#comments"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex h-auto flex-1 items-center gap-2 p-2 md:flex-col md:py-4"
            )}
          >
            <Icons.comment />
            {post._count.comments}
          </Link>
          <BookmarkButton
            title={post.title}
            postId={post.id}
            initialState={!!post?.bookmarks?.length}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex h-auto flex-1 items-center gap-2 p-2.5 md:flex-col md:py-6"
            )}
          />
        </div>
      </aside>
      <div className="col-span-12 overflow-hidden rounded-none bg-white text-card-foreground dark:bg-zinc-900 md:col-span-11 md:rounded-lg lg:col-span-8">
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
          <h1 className="mb-3 scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl">
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
            <div className="flex justify-end gap-2">
              <Link
                href={`/${post.user.username}/${post.id}/edit`}
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                <Icons.edit className="mr-2 inline" size={14} />
                Edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>

        <Suspense fallback={<>Loading...</>}>
          <CommentSection postId={post.id} />
        </Suspense>
      </div>

      <div className="hidden flex-col gap-3 lg:col-span-3 lg:flex">
        <Card className="w-full border-0 bg-white shadow-none dark:bg-zinc-900">
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

        {/* TODO: Table of content */}
      </div>
    </div>
  )
}
