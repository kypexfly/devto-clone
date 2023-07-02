import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

import { Skeleton } from "../ui/skeleton"

export function PostFeedSkeleton() {
  return Array(5)
    .fill(0)
    .map((p, i) => {
      if (i === 0) {
        return <PostSkeleton showCover />
      }

      return <PostSkeleton />
    })
}

interface PostSkeletonProps {
  showCover?: boolean
}

export function PostSkeleton({ showCover }: PostSkeletonProps) {
  return (
    <Card className="shadow-none mb-2 bg-white dark:bg-zinc-900 border-0 max-w-3xl overflow-hidden">
      {showCover && (
        <div className="cover">
          <AspectRatio ratio={100 / 42} className="relative">
            <div className="h-full w-full" />
          </AspectRatio>
        </div>
      )}
      <div className="flex flex-row items-center gap-2 p-6 pb-0">
        <div className="h-10 w-10">
          <div className="relative aspect-square h-full w-full">
            <Skeleton className="absolute h-full w-full rounded-full" />
          </div>
        </div>

        <div>
          <Skeleton className="h-4 w-28 mb-2" />
          <small>
            <Skeleton className="h-4 w-44" />
          </small>
        </div>
      </div>
      <CardHeader className="pl-16 py-2">
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          <div className="h-10 w-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-16">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex gap-3 pt-3">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}
