"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

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
      <DialogContent className="max-w-sm bg-card">{children}</DialogContent>
    </Dialog>
  )
}
