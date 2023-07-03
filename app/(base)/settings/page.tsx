import { UsernameForm } from "@/components/UsernameForm"

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3">
        Change username
      </h1>

      <UsernameForm />
    </div>
  )
}
