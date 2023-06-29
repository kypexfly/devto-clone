import { UsernameForm } from "@/components/UsernameForm"

export default function SettingsPage() {
  return (
    <div className="space-y-6 bg-background p-8 rounded-lg border">
      <h1 className="scroll-m-20 text-3xl tracking-tight font-bold lg:text-4xl mb-3">
        Change username
      </h1>

      <UsernameForm />
    </div>
  )
}
