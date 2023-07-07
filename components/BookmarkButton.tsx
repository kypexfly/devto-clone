"use client"

import { useState } from "react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { cn } from "@/lib/utils"
import { BookmarkRequest, BookmarkValidator } from "@/lib/validators/bookmark"
import { useToast } from "@/hooks/use-toast"

import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button"

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
        // setSaved(true)
        return toast({
          description: `"${title}" saved from your bookmarks.`,
        })
      }

      if (data === "UNSAVED") {
        // setSaved(false)
        return toast({
          description: `"${title}" deleted from your bookmarks.`,
        })
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            description: "You must be logged in to bookmark",
            variant: "destructive",
            action: (
              <Link className={buttonVariants()} href="/login">
                Login
              </Link>
            ),
          })
        }
      }

      return toast({
        description: "Something went wrong.",
      })
    },
  })

  return (
    <button
      aria-label={`Bookmark "${title}"`}
      title={`Bookmark "${title}"`}
      onClick={() => updateBookmark({ postId })}
      className={cn(saved && "text-blue-600", "px-2")}
    >
      <Icons.bookmark />
    </button>
  )
}
