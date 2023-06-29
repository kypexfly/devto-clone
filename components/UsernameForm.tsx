"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { UsernameValidator } from "@/lib/validators/username"
import { toast } from "@/hooks/use-toast"

import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

export function UsernameForm() {
  const router = useRouter()

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async (name: { name: string }) => {
      const payload = UsernameValidator.parse(name)
      const { data } = await axios.patch("/api/username", payload)

      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already taken.",
            description: "Please choose another username.",
            variant: "destructive",
          })
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your username was not updated. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "Your username has been updated.",
      })
      router.refresh()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = new FormData(e.currentTarget).get("name") as string
    updateUsername({ name })
    e.currentTarget.reset()
    return false // prevent form from submitting to server.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        name="name"
        type="text"
        autoComplete="new-password"
        placeholder="Your new username"
      />

      <div className="flex items-center justify-end">
        <Button type="submit" isLoading={isLoading}>
          Change name
        </Button>
      </div>
    </form>
  )
}
