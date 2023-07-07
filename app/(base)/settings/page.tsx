import { Metadata } from "next"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

import { SettingsForm } from "./SettingsForm"

export const metadata: Metadata = {
  title: "Settings",
  description: "Change your account data",
}

export default async function SettingsPage() {
  const session = await getAuthSession()

  const extendedUser = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      details: true,
    },
  })

  return (
    <main className="w-full max-w-screen-md mx-auto space-y-6">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl pt-4 md:pt-0 pb-4 px-2">
        Settings for {`@${session?.user.username}`}
      </h1>

      {/* Assertion: middleware will make sure this route is only accessible to logged in users */}
      <SettingsForm user={extendedUser!} />
    </main>
  )
}
