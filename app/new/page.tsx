"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function CreatePage() {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <div className="col-span-4 space-y-6 bg-background p-8 rounded-lg border">
        <h1 className="scroll-m-20 text-3xl tracking-tight lg:text-4xl mb-3">
          Create New Post
        </h1>

        <div className="flex flex-col gap-3 [&>label]:font-bold">
          <label>Title</label> <Input placeholder="Insert the title" />
          <label>Tags</label> <Input placeholder="Insert the title" />
          <label>Content</label> <Input placeholder="Insert the content" />
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()} variant="secondary">
            Cancel
          </Button>
          <Button>Create</Button>
        </div>
      </div>

      <div className="bg-background p-8 rounded-lg border col-span-2">
        Holas
      </div>
    </div>
  )
}
