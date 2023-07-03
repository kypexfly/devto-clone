"use client"

import { ChangeEvent, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useTheme } from "next-themes"
import { TagsInput } from "react-tag-input-component"
import { ZodError } from "zod"

import { PostCreationRequest, PostValidator } from "@/lib/validators/post"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type CreatePostResponse = {
  username: string
  postId: string
}

export function PostCreator() {
  const { theme } = useTheme()
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
        "/api/post/create",
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

      const { username, postId } = data

      router.push(`/${username}/${postId}`)
    },
  })
  return (
    <div className="overflow-hidden col-span-12 md:col-span-11 lg:col-span-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-3 [&>label]:font-bold p-4 md:px-12 md:py-8">
        <h1 className="tracking-tight font-bold">Create New Post</h1>
        <Input
          className="shadow-none bg-transparent border-0 focus-visible:ring-0 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl h-auto"
          inputMode="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Insert title"
        />

        <TagsInput
          value={tags}
          name="tags"
          separators={["Enter", ",", " "]}
          onChange={setTags}
          placeHolder="Add up to 4 tags..."
        />

        <div className="min-h-[350px]" data-color-mode={theme}>
          <MDEditor
            value={content}
            onChange={setContent}
            preview="edit"
            height={350}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 p-4 md:px-12 md:py-8 mt-auto">
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
