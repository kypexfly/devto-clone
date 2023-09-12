"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { cn } from "@/lib/utils"
import { BookmarkRequest, BookmarkValidator } from "@/lib/validators/bookmark"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useToast } from "@/hooks/use-toast"

import { Icons } from "./Icons"

interface BookmarkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  postId: string
  initialState?: boolean
}

export function BookmarkButton({
  title,
  postId,
  initialState,
  className,
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState<boolean>(initialState ?? false)
  const { toast } = useToast()
  const { loginToast } = useCustomToast()

  const { mutate: updateBookmark } = useMutation({
    mutationFn: async ({ postId }: BookmarkRequest) => {
      const payload = BookmarkValidator.parse({ postId })
      const { data } = await axios.put("/api/post/bookmark", payload)
      return data as string
    },
    onSuccess: (data) => {
      if (data === "SAVED") {
        setSaved(true)

        return toast({
          description: `"${title}" saved to your bookmarks.`,
        })
      }

      if (data === "UNSAVED") {
        setSaved(false)

        return toast({
          description: `"${title}" deleted from your bookmarks.`,
        })
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
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
      className={cn("rounded px-2 hover:bg-blue-500/25", className)}
    >
      <Icons.bookmark
        className={cn(saved && "rounded-lg fill-blue-600 text-blue-600")}
      />
    </button>
  )
}
