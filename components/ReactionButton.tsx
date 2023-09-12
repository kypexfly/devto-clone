"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { cn } from "@/lib/utils"
import { ReactionRequest, ReactionValidator } from "@/lib/validators/reaction"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useToast } from "@/hooks/use-toast"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"

interface ReactionButtonProps {
  postId: string
  count: number
  initialState?: boolean
}

type ReactionResponse = {
  type: string
  count: number
}

export function ReactionButton({
  count: reactionCount,
  initialState,
  postId,
}: ReactionButtonProps) {
  const [count, setCount] = useState<number>(reactionCount)
  const [reacted, setReacted] = useState<boolean>(initialState ?? false)
  const { toast } = useToast()
  const { loginToast } = useCustomToast()

  const { mutate: updateReaction } = useMutation({
    mutationFn: async ({ postId }: ReactionRequest) => {
      const payload = ReactionValidator.parse({ postId })
      const { data } = await axios.put("/api/post/reaction", payload)
      return data as ReactionResponse
    },
    onSuccess: (data) => {
      if (data.type === "SAVED") {
        setReacted(true)
        setCount(data.count)
      } else {
        setReacted(false)
        setCount(data.count > 0 ? data.count - 1 : 0)
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
    <Button
      onClick={() => updateReaction({ postId })}
      className={cn(
        "flex h-auto flex-1 items-center gap-2 p-2 md:flex-col md:py-4"
      )}
      variant="ghost"
    >
      <Icons.heart
        className={cn(reacted && "rounded-lg fill-red-600 text-red-600")}
      />
      {count}
    </Button>
  )
}
