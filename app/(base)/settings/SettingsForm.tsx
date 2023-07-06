"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/Input"

export function SettingsForm() {
  //   const {
  //     register,
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<PostCreationRequest>({
  //     resolver: zodResolver(PostValidator),
  //     defaultValues: {
  //       title: "",
  //       tags: [],
  //       content: "",
  //     },
  //   })

  return (
    <form className="!m-0 space-y-2">
      <div className="p-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3">
          User
        </h1>

        <label>Username</label>
        <Input
          name="name"
          type="text"
          autoComplete="new-password"
          placeholder="Your new username"
        />
      </div>

      <div className="p-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3">
          Basic
        </h1>

        <label>Website URL</label>
        <Input
          name="name"
          type="text"
          autoComplete="new-password"
          placeholder="Your new username"
        />

        <label>Location</label>
        <Input
          name="name"
          type="text"
          autoComplete="new-password"
          placeholder="Your new username"
        />

        <label>Bio</label>
        <Input
          name="name"
          type="text"
          autoComplete="new-password"
          placeholder="Your new username"
        />
      </div>

      <div className="p-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900 flex">
        <Button className="flex-1">Save</Button>
      </div>
    </form>
  )
}
