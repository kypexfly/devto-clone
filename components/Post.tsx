import Image from "next/image"
import Link from "next/link"

import { PostPayload } from "@/types/post"

import Tag from "./Tag"
import { AspectRatio } from "./ui/aspect-ratio"
import { buttonVariants } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { UserAvatar } from "./UserAvatar"

interface PostProps {
  post: PostPayload
  commentAmt: number
  showCover?: boolean
}

export function Post({ post, commentAmt, showCover }: PostProps) {
  const { title, id, createdAt, tags, user } = post
  const { username } = user

  return (
    <Card className="shadow-none mb-4 bg-white dark:bg-zinc-900 border-0 max-w-3xl overflow-hidden">
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
      <div className="flex flex-row items-center gap-2 p-6 pb-0">
        <Link href={`/${username}`}>
          <UserAvatar user={user} />
        </Link>
        <div>
          <Link href={`/${username}`}>{username}</Link> <br />
          <small>
            <time>{new Date(createdAt).toDateString()}</time>
          </small>
        </div>
      </div>
      <CardHeader className="pl-16 py-2">
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          <Link href={`/${username}/${id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-16">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.name} href={`/t/${tag.name}`}>
              <Tag>{tag.name}</Tag>
            </Link>
          ))}
        </ul>

        <div className="pt-3">
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={`${username}/${id}`}
          >
            x reaction
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={`$${username}/${id}#comments`}
          >
            {commentAmt || 0} comments
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
