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
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="p-8 rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
