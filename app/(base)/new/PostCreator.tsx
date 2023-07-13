"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useTheme } from "next-themes"
import { Controller, useForm } from "react-hook-form"
import { TagsInput } from "react-tag-input-component"
import { z } from "zod"

import { PostCreationRequest, PostValidator } from "@/lib/validators/post"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/separator"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type CreatePostResponse = {
  username: string
  postId: string
}

export function PostCreator() {
  const { theme } = useTheme()
  const router = useRouter()

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async ({
      title,
      cover,
      tags,
      content,
    }: PostCreationRequest) => {
      const payload = PostValidator.parse({
        title,
        cover,
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
      if (error instanceof z.ZodError) {
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      cover: "",
      tags: [],
      content: "",
    },
  })

  const onSubmit = (data: PostCreationRequest) => {
    createPost(data)
    return false
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-12 overflow-hidden rounded-none bg-white text-card-foreground dark:bg-zinc-900 md:col-span-11 md:rounded-xl lg:col-span-8"
    >
      <div className="flex flex-col gap-3 p-4 md:px-12 md:py-8 [&>label]:font-bold">
        <h1 className="font-bold tracking-tight">Create New Post</h1>

        <Input
          className="h-auto scroll-m-20 border-0 bg-transparent text-4xl font-extrabold tracking-tight shadow-none focus-visible:ring-0 lg:text-5xl"
          inputMode="text"
          {...register("title", { required: true })}
          placeholder="Insert title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}

        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <TagsInput
              separators={["Enter", ",", " "]}
              placeHolder="Add up to 4 tags..."
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.tags && (
          <p className="text-sm text-red-500">{errors.tags.message}</p>
        )}

        <Input
          inputMode="text"
          {...register("cover")}
          placeholder="post cover image url..."
        />
        {errors.cover && (
          <p className="text-sm text-red-500">{errors.cover?.message}</p>
        )}

        <Separator />

        <div
          className="min-h-[350px]"
          data-color-mode={theme}
          suppressHydrationWarning
        >
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MDEditor
                value={value}
                onChange={onChange}
                preview="edit"
                height={350}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-auto flex justify-end gap-3 p-4 md:px-12 md:py-8">
        <Button onClick={() => router.back()} variant="secondary">
          Cancel
        </Button>
        <Button isLoading={isLoading}>Create</Button>
      </div>
    </form>
  )
}
