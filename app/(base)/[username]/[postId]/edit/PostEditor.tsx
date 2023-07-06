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

import {
  PostCreationRequest,
  PostUpdateValidator,
  PostValidator,
} from "@/lib/validators/post"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/separator"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type CreatePostResponse = {
  username: string
  postId: string
}

interface PostEditorProps {
  initialValues?: PostCreationRequest
  postId: string
  authorId: string
}

export function PostEditor({
  initialValues,
  postId,
  authorId,
}: PostEditorProps) {
  const { theme } = useTheme()
  const router = useRouter()

  const { mutate: updatePost, isLoading } = useMutation({
    mutationFn: async ({
      title,
      cover,
      tags,
      content,
    }: PostCreationRequest) => {
      const payload = PostUpdateValidator.parse({
        title,
        tags,
        cover,
        content,
        postId,
        authorId,
      })

      const { data } = await axios.patch<CreatePostResponse>(
        "/api/post/update",
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
        description: "Post updated successfully",
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
    defaultValues: initialValues,
  })

  const onSubmit = (data: PostCreationRequest) => {
    updatePost(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden col-span-12 md:col-span-11 lg:col-span-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900"
    >
      <div className="flex flex-col gap-3 [&>label]:font-bold p-4 md:px-12 md:py-8">
        <h1 className="tracking-tight font-bold">Edit Post</h1>
        <Input
          className="shadow-none bg-transparent border-0 focus-visible:ring-0 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl h-auto"
          inputMode="text"
          {...register("title", { required: true })}
          placeholder="Insert title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Controller
          name="tags"
          control={control}
          defaultValue={initialValues!.tags}
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
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}

        <Input
          inputMode="text"
          {...register("cover")}
          placeholder="post cover image url..."
        />
        {errors.cover && (
          <p className="text-red-500 text-sm">{errors.cover?.message}</p>
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
            defaultValue={initialValues!.content}
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

      <div className="flex justify-end gap-3 p-4 md:px-12 md:py-8 mt-auto">
        <Button onClick={() => router.back()} variant="secondary">
          Cancel
        </Button>
        <Button isLoading={isLoading}>Update</Button>
      </div>
    </form>
  )
}
