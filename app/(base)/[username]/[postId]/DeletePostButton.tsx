"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"

import { serviceDeletePost } from "@/lib/api/posts/posts"
import { PostDeleteRequest, PostDeleteValidator } from "@/lib/validators/post"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"

interface DeletePostButtonProps {
  postId: string
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter()
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async (postId: PostDeleteRequest) => {
      const payload = PostDeleteValidator.parse(postId)
      await serviceDeletePost(payload.postId)
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button isLoading={isLoading} variant="secondary" size="sm">
          <Icons.delete className="mr-2 inline" size={14} />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deletePost({ postId })}
          >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
