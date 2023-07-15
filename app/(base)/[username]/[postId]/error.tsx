"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/Button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
  }, [error])

  return (
    <div className="rounded-none bg-white p-8 text-card-foreground dark:bg-zinc-900 md:rounded-lg">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
