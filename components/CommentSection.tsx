import { db } from "@/lib/db"
import { Textarea } from "@/components/ui/Textarea"

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
  })

  return (
    <section id="comments" className="p-4 md:p-12 border-t">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`Comments (${comments.length})`}
      </h2>
      <Textarea placeholder="Type your message here." />
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <p>@{`${c.userId} / ${c.createdAt.toDateString()}`}</p>
            <p>{c.content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
