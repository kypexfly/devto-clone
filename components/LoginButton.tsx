"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

import { toast } from "@/hooks/use-toast"

import { Icon, Icons } from "./Icons"
import type { ButtonProps } from "./ui/Button"
import { Button } from "./ui/Button"

type OAuhProvider = "google" | "github"

interface LoginButtonProps extends ButtonProps {
  provider: OAuhProvider
}

export default function LoginButton({
  provider,
  children,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async () => {
    setIsLoading(true)

    try {
      await signIn(provider)
    } catch (error) {
      toast({ title: "Could not login", description: "Something went wrong." })
    } finally {
      setIsLoading(false)
    }
  }

  const getIconComponent = (iconKey: OAuhProvider): Icon => {
    return Icons[iconKey as keyof typeof Icons]
  }

  const ProviderIcon = getIconComponent(provider)

  return (
    <Button isLoading={isLoading} onClick={login} size="lg" {...props}>
      {!isLoading && <ProviderIcon className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  )
}
