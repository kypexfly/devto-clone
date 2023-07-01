import { Suspense } from "react"
import Link from "next/link"

import { GeneralFeed } from "@/components/homepage/GeneralFeed"
import { PostFeedSkeleton } from "@/components/skeleton/PostFeedSkeleton"

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <ul className="flex flex-wrap items-center space-x-4 pt-4 md:pt-0 pb-4 px-2">
            {["Relevant", "Latest", "Top"].map((item, index) => (
              <li className="font-bold" key={index}>
                <Link href="#">{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Suspense fallback={<PostFeedSkeleton />}>
        <GeneralFeed />
      </Suspense>
    </>
  )
}
