import { Suspense } from "react"

import { GeneralFeed } from "@/components/homepage/GeneralFeed"
import { PostFeedSkeleton } from "@/components/skeleton/PostFeedSkeleton"

export const dynamic = "force-dynamic"

interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  return (
    <>
      <h1 className="mb-3 scroll-m-20 px-2 pt-4 text-xl font-semibold tracking-tight">
        Latest posts
      </h1>

      <Suspense fallback={<PostFeedSkeleton firstPostCover />}>
        <GeneralFeed />
      </Suspense>
    </>
  )
}
