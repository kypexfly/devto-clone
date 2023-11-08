"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"

import { ExtendedUserPayload } from "@/types/settings"
import { serviceUpdateSettings } from "@/lib/api/settings/settings"
import {
  SettingsUpdateValidator,
  SettingUpdateRequest,
} from "@/lib/validators/settings"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

interface SettingsFormProps {
  user: ExtendedUserPayload
}

export function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter()

  const form = useForm<SettingUpdateRequest>({
    resolver: zodResolver(SettingsUpdateValidator),
    defaultValues: {
      username: user.username ?? undefined,
      website: user.details?.website ?? undefined,
      location: user.details?.location ?? undefined,
      bio: user.details?.bio ?? undefined,
    },
  })

  const { mutate: updateSettings, isLoading } = useMutation({
    mutationFn: async (formData: SettingUpdateRequest) => {
      const payload = SettingsUpdateValidator.parse(formData)
      const { data } = await serviceUpdateSettings(payload)

      return data
    },
    onSuccess: () => {
      toast({ description: "User settings updated" })
      router.refresh()
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 409) {
          return toast({
            description: "Username already taken",
            variant: "destructive",
          })
        }

        if (err.status === 400) {
          return toast({ description: err.message, variant: "destructive" })
        }
      }

      return toast({
        description: "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (formData: SettingUpdateRequest) => {
    updateSettings(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="!m-0 space-y-2">
        <div className="rounded-none bg-white p-8 text-card-foreground dark:bg-zinc-900 md:rounded-lg">
          <h1 className="mb-3 scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
            User
          </h1>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="new username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 rounded-none bg-white p-8 text-card-foreground dark:bg-zinc-900 md:rounded-lg">
          <h1 className="mb-3 scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
            Basic
          </h1>

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Miami, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-white dark:bg-black"
                    placeholder="A short bio..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex rounded-none bg-white p-8 text-card-foreground dark:bg-zinc-900 md:rounded-lg">
          <Button isLoading={isLoading} type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
