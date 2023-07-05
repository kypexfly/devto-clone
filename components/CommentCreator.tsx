"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { z } from "zod"

import { CommentRequest, CommentValidator } from "@/lib/validators/comment"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"

export function CommentCreator({ postId }: { postId: string }) {
  const [content, setContent] = useState<string>("")
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const router = useRouter()

  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async ({ postId, content }: CommentRequest) => {
      const payload = CommentValidator.parse({ postId, content })
      const { data } = await axios.post("/api/posts/comment", payload)
      return data
    },

    onSuccess: () => {
      toast({ description: "Your comment has been posted" })
      setContent("")
      router.refresh()
    },

    onError: (err) => {
      if (err instanceof z.ZodError) {
        toast({
          description: err.message,
          variant: "destructive",
        })
      }

      toast({
        description: "Something went wrong",
        variant: "destructive",
      })
    },
  })

  return (
    <>
      <Textarea
        value={content}
        onChange={handleOnChange}
        className="p-4"
        placeholder="Type your comment here..."
      />
      <div className="flex justify-end my-3">
        <Button
          isLoading={isLoading}
          disabled={content.length === 0 || isLoading}
          size="sm"
          onClick={() => createComment({ postId, content })}
        >
          Comment
        </Button>
      </div>
    </>
  )
}
