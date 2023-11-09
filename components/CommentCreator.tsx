"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { serviceCreateComment } from "@/lib/api/comments/comments"
import { CommentRequest, CommentValidator } from "@/lib/validators/comment"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"

export function CommentCreator({ postId }: { postId: string }) {
  const router = useRouter()

  const [content, setContent] = useState<string>("")
  const { loginToast } = useCustomToast()

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async ({ postId, content }: CommentRequest) => {
      const payload = CommentValidator.parse({ postId, content })
      const { data } = await serviceCreateComment(payload)
      return data
    },

    onSuccess: () => {
      toast({ description: "Your comment has been posted" })
      setContent("")
      router.refresh()
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
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
      <div className="my-3 flex justify-end">
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
