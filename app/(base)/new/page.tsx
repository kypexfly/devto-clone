import { Card, CardContent, CardHeader } from "@/components/ui/Card"

import { PostCreator } from "./PostCreator"

import "@/styles/post-creator.css"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create post",
}

const PostTips = () => {
  return (
    <div className="hidden flex-col gap-3 md:col-span-3 md:flex">
      <Card className="w-full bg-white shadow-none dark:bg-zinc-900 md:rounded-lg">
        <CardHeader>
          <h2 className="font-bold tracking-tight">How to create a post?</h2>
        </CardHeader>
        <CardContent>
          <strong>Title</strong>
          <ul className="list-inside list-disc text-sm">
            <li>Make the title concise but descriptive.</li>
            <li>Make it catchy to attract attention.</li>
          </ul>
          <br />

          <strong>Tags</strong>
          <ul className="list-inside list-disc text-sm">
            <li>
              Include keywords that users might use to search for your post (up
              to 4 tags).
            </li>
          </ul>
          <br />

          <strong>Cover image URL</strong>
          <ul className="list-inside list-disc text-sm">
            <li>
              The cover image for your post will be displayed using a URL from
              Unsplash.
            </li>
          </ul>
          <br />

          <strong>Post Formatting</strong>
          <ul className="list-inside list-disc text-sm">
            <li>
              Break up long paragraphs into smaller ones to make the text easier
              to read.
            </li>
            <li>Use headers to organize your content and make it scannable.</li>
            <li>Use bold and italic formatting to emphasize key points.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CreatePage() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="hidden lg:col-span-1 lg:block "></aside>
      <div className="col-span-12 overflow-hidden rounded-none border bg-white text-card-foreground dark:bg-zinc-900 md:col-span-9 md:rounded-lg lg:col-span-8">
        <PostCreator />
      </div>
      <PostTips />
    </div>
  )
}
