"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { z } from "zod"

import { PostDeleteRequest, PostDeleteValidator } from "@/lib/validators/post"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"

interface DeletePostButtonProps {
  postId: string
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter()
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async (postId: PostDeleteRequest) => {
      const payload = PostDeleteValidator.parse(postId)
      await axios.delete(`/api/post?id=${payload.postId}`)
    },
    onError: (error) => {
      if (error instanceof z.ZodError) {
        return toast({
          title: "Error deleting post.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "Post deleted successfully",
      })
      router.push("/")
    },
  })

  return (
    <Button
      onClick={() => deletePost({ postId })}
      isLoading={isLoading}
      variant="destructive"
      size="sm"
    >
      <Icons.close className="mr-2 inline" size={14} />
      Delete
    </Button>
  )
}
