import Image from "next/image"
import Link from "next/link"

import { PostPayload } from "@/types/post"
import { DEFAULT_POST_COVER } from "@/config/post"

import { BookmarkButton } from "./BookmarkButton"
import { PostAuthor } from "./PostAuthor"
import { Tag } from "./Tag"
import { AspectRatio } from "./ui/aspect-ratio"
import { buttonVariants } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

interface PostProps {
  post: PostPayload
  commentAmt: number
  showCover?: boolean
  bookmarked: boolean
}

export function Post({ post, commentAmt, showCover, bookmarked }: PostProps) {
  const { title, id, createdAt, tags, author, cover } = post
  const { username } = author

  return (
    <Card className="mb-2 max-w-3xl overflow-hidden rounded-none border-0 bg-white shadow-none dark:bg-zinc-900 md:rounded-lg">
      {showCover && (
        <div className="cover">
          <Link href={`/${username}/${id}`}>
            <AspectRatio ratio={100 / 42} className="relative">
              <Image
                fill
                className="object-cover"
                loading="lazy"
                alt=""
                src={cover || DEFAULT_POST_COVER}
              />
            </AspectRatio>
          </Link>
        </div>
      )}
      <PostAuthor user={author} createdAt={createdAt} className="p-6 pb-0" />
      <CardHeader className="py-2 pl-4 md:pl-16">
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          <Link href={`/${username}/${id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-4 md:pl-16">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.name} href={`/t/${tag.name}`}>
              <Tag>{tag.name}</Tag>
            </Link>
          ))}
        </ul>

        <div className="flex justify-between pt-3">
          <div>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={`${username}/${id}`}
            >
              {post?._count?.reactions || 0} reaction
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={`/${username}/${id}#comments`}
            >
              {commentAmt || 0} comments
            </Link>
          </div>

          <BookmarkButton title={post.title} postId={post.id} initialState={bookmarked} />
        </div>
      </CardContent>
    </Card>
  )
}
