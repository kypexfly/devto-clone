"use client"

import { ChangeEvent, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { TagsInput } from "react-tag-input-component"
import { ZodError } from "zod"

import { PostCreationRequest, PostValidator } from "@/lib/validators/post"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type CreatePostResponse = {
  userId: string
  postId: string
}

export default function CreatePage() {
  const router = useRouter()

  const [title, setTitle] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState<string | undefined>("")

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async ({ title, tags, content }: PostCreationRequest) => {
      const payload = PostValidator.parse({
        title,
        tags,
        content,
      })

      const { data } = await axios.post<CreatePostResponse>(
        "/api/create",
        payload
      )

      return data
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        return toast({
          title: "Error creating post.",
          description: "Check your inputs and try again.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      })
    },
    onSuccess: (data) => {
      toast({
        description: "Post created successfully",
      })

      const { userId, postId } = data

      router.push(`/${userId}/${postId}`)
    },
  })

  return (
    <div className="space-y-6 bg-background p-8 rounded-lg border">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3">
        Create New Post
      </h1>

      <div className="flex flex-col gap-3 [&>label]:font-bold">
        <label>Title</label>
        <Input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Insert title"
        />

        <label>Tags</label>
        <TagsInput value={tags} onChange={setTags} placeHolder="Insert tags" />
        <em className="text-sm text-muted-foreground">
          Press enter to add new tag
        </em>
        <label>Content</label>
        <div className="min-h-[200px]">
          <MDEditor value={content} onChange={setContent} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={() => router.back()} variant="secondary">
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={async () => createPost({ title, tags, content })}
        >
          Create
        </Button>
      </div>
    </div>
  )
}
