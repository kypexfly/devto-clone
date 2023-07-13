import { Comment, User } from "@prisma/client"
import Link from "next/link"
import { UserAvatar } from "./UserAvatar"

type ExtendedComment = Comment & {
  user: User
}

interface CommentProps {
  comment: ExtendedComment
}

export function Comment({ comment }: CommentProps) {
  const {user} = comment

  return (
    <div className="flex items-start gap-2">
      <Link href={`/${comment.user.username}`}>
        <UserAvatar user={user} />
      </Link>
      <div className="flex-1 rounded border px-2 py-4">
        <div>
          <Link href={`/${user.username}`}>@{user.username}</Link> 
          {" "} • {" "}
          <small className="text-muted-foreground">
            {comment.createdAt.toDateString()}
          </small>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}
