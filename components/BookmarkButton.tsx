"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { BookmarkRequest, BookmarkValidator } from "@/lib/validators/bookmark"
import { useToast } from "@/hooks/use-toast"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"

interface BookmarkButton {
  title: string
  postId: string
}

export function BookmarkButton({ title, postId }: BookmarkButton) {
  const [saved, setSaved] = useState<boolean>(false)
  const { toast } = useToast()

  const { mutate: updateBookmark } = useMutation({
    mutationFn: async ({ postId }: BookmarkRequest) => {
      const payload = BookmarkValidator.parse({ postId })
      const { data } = await axios.put("/api/post/bookmark", payload)
      return data as string
    },
    onSuccess: (data) => {
      if (data === "SAVED") {
        return toast({
          description: `"${title}" saved from your bookmarks.`,
        })
      }

      if (data === "UNSAVED") {
        return toast({
          description: `"${title}" deleted from your bookmarks.`,
        })
      }
    },
    onError: (err) => {
      if (err instanceof z.ZodError) {
        toast({
          description: err.message,
        })
      }

      toast({
        description: "Something went wrong.",
      })
    },
  })

  return (
    <Button
      variant="ghost"
      aria-label={`Bookmark "${title}"`}
      title={`Bookmark "${title}"`}
      onClick={() => updateBookmark({ postId })}
      className={cn(saved && "text-blue-600")}
    >
      <Icons.bookmark />
    </Button>
  )
}
