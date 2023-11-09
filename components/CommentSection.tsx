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
    <section id="comments" className="border-t p-4 md:p-12">
      <h2 className="mb-3 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`Comments (${comments.length})`}
      </h2>
      <CommentCreator postId={postId} />
      <ul className="space-y-6">
        {comments.map((comment, index) => (
          <li key={index}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  )
}
