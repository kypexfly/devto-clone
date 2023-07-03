import React from "react"
import Link from "next/link"
import { User } from "@prisma/client"

import { cn, formatTimeToNow } from "@/lib/utils"

import { UserAvatar } from "./UserAvatar"

interface PostAuthorProps {
  className?: string
  user: User
  createdAt: Date
}

export function PostAuthor({ className, user, createdAt }: PostAuthorProps) {
  const createdDate = new Date(createdAt)
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <Link href={`/${user.username}`}>
        <UserAvatar user={user} />
      </Link>
      <div>
        <Link href={`/${user.username}`}>{`@${user.username}`}</Link> <br />
        <small className="text-muted-foreground">
          <time>
            {`${createdDate.toDateString()} (${formatTimeToNow(createdDate)})`}
          </time>
        </small>
      </div>
    </div>
  )
}
