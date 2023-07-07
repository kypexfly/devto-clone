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
      <aside className="hidden lg:block lg:col-span-1 "></aside>
      <div className="overflow-hidden col-span-12 md:col-span-9 lg:col-span-8 bg-card rounded-none md:rounded-xl text-card-foreground bg-white dark:bg-zinc-900">
        <PostCreator />
      </div>
      <div className="hidden md:flex flex-col md:col-span-3 gap-3">
        <Card className="shadow-none bg-white dark:bg-zinc-900 border-0 w-full">
          <CardHeader>Aditional info</CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Title must have between 10 and 80 characters.</li>
              <li>Tags must be between 1 and 4.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
