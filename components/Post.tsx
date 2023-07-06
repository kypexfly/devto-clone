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
}

export function Post({ post, commentAmt, showCover }: PostProps) {
  const { title, id, createdAt, tags, user, cover } = post
  const { username } = user

  return (
    <Card className="shadow-none mb-2 bg-white dark:bg-zinc-900 border-0 max-w-3xl overflow-hidden rounded-none md:rounded-xl">
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
      <PostAuthor user={user} createdAt={createdAt} className="p-6 pb-0" />
      <CardHeader className="pl-4 md:pl-16 py-2">
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
              0 reaction
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={`/${username}/${id}#comments`}
            >
              {commentAmt || 0} comments
            </Link>
          </div>

          <BookmarkButton title={post.title} postId={post.id} />
        </div>
      </CardContent>
    </Card>
  )
}
