"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

import { Icon, Icons } from "./Icons"
import type { ButtonProps } from "./ui/Button"
import { Button } from "./ui/Button"

type Provider = "google" | "github"

interface LoginButtonProps extends ButtonProps {
  provider: Provider
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
      // TODO: Handle error
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIconComponent = (iconKey: Provider): Icon => {
    return Icons[iconKey as keyof typeof Icons]
  }

  const ProviderIcon = getIconComponent(provider)

  return (
    <Button disabled={isLoading} onClick={login} size="lg" {...props}>
      {isLoading ? (
        <Icons.loader className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <ProviderIcon className="mr-2 h-4 w-4" />
      )}
      {children}
    </Button>
  )
}
