import { Suspense } from "react"

import { GeneralFeed } from "@/components/homepage/GeneralFeed"
import { PostFeedSkeleton } from "@/components/skeleton/PostFeedSkeleton"

export const dynamic = "force-dynamic"

interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  return (
    <>
      <h1 className="mb-3 scroll-m-20 px-2 pt-4 text-3xl font-bold tracking-tight lg:text-4xl">
        Latest posts
      </h1>
      <Suspense fallback={<PostFeedSkeleton />}>
        <GeneralFeed />
      </Suspense>
    </>
  )
}
