"use client"

import { AspectRatio } from "@radix-ui/react-aspect-ratio"

import { Card } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export default function loading() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="fixed bottom-0 z-[1] w-full bg-background/50 backdrop-blur-md md:relative md:col-span-1 md:block md:bg-transparent md:backdrop-blur-0 ">
        <div className="sticky bottom-0 flex justify-between md:top-20 md:flex-col md:gap-4">
          <Skeleton />
        </div>
      </aside>
      <div className="col-span-12 h-[200vh] overflow-hidden rounded-none bg-white text-card-foreground dark:bg-zinc-900 md:col-span-11 md:rounded-lg lg:col-span-8">
        <AspectRatio ratio={100 / 42} className="relative">
          <Skeleton className="h-full w-full" />
        </AspectRatio>
        <div className="p-4 md:p-12">
          <ul className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((number) => (
              <Skeleton key={number} className="h-7 w-16" />
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden flex-col gap-3 lg:col-span-3 lg:flex">
        <Card className="h-64 w-full border-0 bg-white shadow-none dark:bg-zinc-900" />
        <Card className="h-96 w-full border-0 bg-white shadow-none dark:bg-zinc-900" />
      </div>
    </div>
  )
}
