import { Card, CardContent, CardHeader } from "@/components/ui/Card"

import { PostCreator } from "./PostCreator"

import "@/styles/post-creator.css"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create post",
}

export default function CreatePage() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="hidden lg:col-span-1 lg:block "></aside>
      <div className="col-span-12 overflow-hidden rounded-none bg-white text-card-foreground dark:bg-zinc-900 md:col-span-9 md:rounded-lg lg:col-span-8">
        <PostCreator />
      </div>
      <div className="hidden flex-col gap-3 md:col-span-3 md:flex">
        <Card className="w-full border-0 bg-white shadow-none dark:bg-zinc-900">
          <CardHeader>Aditional info</CardHeader>
          <CardContent>
            <ul className="list-inside list-disc">
              <li>Title must have between 10 and 80 characters.</li>
              <li>Tags must be between 1 and 4.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
