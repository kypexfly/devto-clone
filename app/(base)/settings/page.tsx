import { getAuthSession } from "@/lib/auth"

import { SettingsForm } from "./SettingsForm"

export default async function SettingsPage() {
  const session = await getAuthSession()

  return (
    <main className="w-full max-w-screen-md mx-auto space-y-6">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl pt-4 md:pt-0 pb-4 px-2">
        Settings for {`@${session?.user.username}`}
      </h1>

      <SettingsForm />
    </main>
  )
}
