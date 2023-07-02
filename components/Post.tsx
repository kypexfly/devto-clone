import Image from "next/image"
import Link from "next/link"

import { PostPayload } from "@/types/post"

import BookmarkButton from "./BookmarkButton"
import { PostAuthor } from "./PostAuthor"
import Tag from "./Tag"
import { AspectRatio } from "./ui/aspect-ratio"
import { buttonVariants } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

interface PostProps {
  post: PostPayload
  commentAmt: number
  showCover?: boolean
}

export function Post({ post, commentAmt, showCover }: PostProps) {
  const { title, id, createdAt, tags, user } = post
  const { username } = user

  return (
    <Card className="shadow-none mb-2 bg-white dark:bg-zinc-900 border-0 max-w-3xl overflow-hidden rounded-none md:rounded-xl">
      <Link
        href={`/${username}/${id}`}
        className="absolute opacity-0 inset-0 pointer-events-none"
      >
        {title}
      </Link>
      {showCover && (
        <div className="cover">
          <Link href={`/${username}/${id}`}>
            <AspectRatio ratio={100 / 42} className="relative">
              <Image
                fill
                className="object-cover"
                loading="lazy"
                alt=""
                src="https://images.unsplash.com/photo-1578589318433-39b5de440c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
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

          <BookmarkButton title={post.title} />
        </div>
      </CardContent>
    </Card>
  )
}
