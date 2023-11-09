import { Metadata } from "next"

import { LoginForm } from "@/components/LoginForm"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-screen-md">
      <LoginForm />
    </div>
  )
}
