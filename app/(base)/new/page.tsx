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
import { Card, CardHeader } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type CreatePostResponse = {
  userId: string
  postId: string
}

export default function CreatePage() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="hidden lg:block lg:col-span-1 "></aside>
      <div className="overflow-hidden col-span-12 md:col-span-9 lg:col-span-8 bg-card rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <PostCreator />
      </div>
      <div className="hidden md:flex flex-col md:col-span-3 gap-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader>Aditional info</CardHeader>
        </Card>
      </div>
    </div>
  )
}

const PostCreator = () => {
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
    <div className="overflow-hidden col-span-12 md:col-span-11 lg:col-span-8 bg-card rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl md:px-12 md:py-8">
        Create New Post
      </h1>

      <div className="flex flex-col gap-3 [&>label]:font-bold p-4 md:px-12 md:py-8">
        <Input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Insert title"
        />

        <TagsInput value={tags} onChange={setTags} placeHolder="Insert tags" />
        <em className="text-sm text-muted-foreground">
          Press enter to add new tag
        </em>

        <div className="min-h-[200px]">
          <MDEditor value={content} onChange={setContent} />
        </div>
      </div>

      <div className="flex justify-end gap-3 md:px-12 md:py-8 mt-auto">
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
