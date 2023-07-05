import { db } from "@/lib/db"

import { Comment } from "./Comment"
import { CommentCreator } from "./CommentCreator"

interface CommentSectionProps {
  postId: string
}

export async function CommentSection({ postId }: CommentSectionProps) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <section id="comments" className="p-4 md:p-12 border-t">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-3">
        {`Comments (${comments.length})`}
      </h2>
      <CommentCreator postId={postId} />
      <ul className="space-y-3">
        {comments.map((comment, index) => (
          <li key={index}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  )
}
