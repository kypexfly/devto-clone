"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

import { CommandDialog } from "./ui/command"
import { Dialog, DialogContent } from "./ui/Dialog"

interface ModalProps {
  children: React.ReactNode
}
export default function Modal({ children }: ModalProps) {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Dialog open={true} onOpenChange={onDismiss}>
      <DialogContent className="p-2 max-w-sm">{children}</DialogContent>
    </Dialog>
  )
}
