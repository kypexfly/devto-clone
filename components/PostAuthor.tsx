import React from "react"
import Link from "next/link"
import { User } from "@prisma/client"

import { cn } from "@/lib/utils"

import { UserAvatar } from "./UserAvatar"

interface PostAuthorProps {
  className?: string
  user: User
  createdAt: Date
}

export function PostAuthor({ className, user, createdAt }: PostAuthorProps) {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <Link href={`/${user.username}`}>
        <UserAvatar user={user} />
      </Link>
      <div>
        <Link href={`/${user.username}`}>{user.username}</Link> <br />
        <small>
          <time>{new Date(createdAt).toDateString()}</time>
        </small>
      </div>
    </div>
  )
}
