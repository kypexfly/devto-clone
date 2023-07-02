"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"

interface BookmarkButton {
  title: string
  postId?: string // TODO: remove optional
  userId?: string // TODO: remove optional
}

export default function BookmarkButton({
  title,
  postId,
  userId,
}: BookmarkButton) {
  const [saved, setSaved] = useState<boolean>(false)
  const { toast } = useToast()
  
  // TODO: bookmark logic for server side

  const handleClick = () => {
    if (saved) {
      setSaved(false)
      toast({
        description: `"${title}" removed from your bookmarks.`,
      })
    } else {
      setSaved(true)
      toast({
        description: `"${title}" saved to your bookmarks.`,
      })
    }
  }

  return (
    <Button
      variant="ghost"
      aria-label={`Bookmark "${title}"`}
      title={`Bookmark "${title}"`}
      onClick={handleClick}
      className={cn(saved && "text-blue-600")}
    >
      <Icons.bookmark />
    </Button>
  )
}
