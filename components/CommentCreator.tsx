"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { CommentRequest, CommentValidator } from "@/lib/validators/comment"
import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/Button"
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
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            description: "You must be logged in to comment",
            variant: "destructive",
            action: (
              <Link className={buttonVariants()} href="/login">
                Login
              </Link>
            ),
          })
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
