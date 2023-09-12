import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"

import { toast } from "./use-toast"

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Log in required.",
      description: "You must be logged to make this action.",
      variant: "destructive",
      action: (
        <Link
          onClick={() => dismiss()}
          className={buttonVariants()}
          href="/login"
        >
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}
