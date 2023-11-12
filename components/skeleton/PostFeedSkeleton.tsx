import { AspectRatio } from "@/components/ui/AspectRatio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

import { Skeleton } from "../ui/Skeleton"

type PostFeedSkeletonProps = {
  number?: number
  firstPostCover?: boolean
}

export function PostFeedSkeleton({
  number,
  firstPostCover,
}: PostFeedSkeletonProps) {
  return Array(number ?? 5)
    .fill(0)
    .map((p, i) => {
      if (i === 0 && firstPostCover) return <PostSkeleton showCover />
      return <PostSkeleton />
    })
}

interface PostSkeletonProps {
  showCover?: boolean
}

export function PostSkeleton({ showCover }: PostSkeletonProps) {
  return (
    <Card className="mb-2 max-w-3xl overflow-hidden border-0 bg-white shadow-none dark:bg-zinc-900">
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
          <Skeleton className="mb-2 h-4 w-28" />
          <small>
            <Skeleton className="h-4 w-44" />
          </small>
        </div>
      </div>
      <CardHeader className="py-2 pl-16">
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
