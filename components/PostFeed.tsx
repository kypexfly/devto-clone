"use client"

import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"

import { PostPayload } from "@/types/post"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config/post"
import { serviceGetPosts } from "@/lib/api/posts/posts"

import { CircleLoader } from "./Loaders"
import { Post } from "./Post"

interface PostFeedProps {
  initialPosts: PostPayload[]
}

export default function PostFeed({ initialPosts }: PostFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null)

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.5,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        limit: `${INFINITE_SCROLL_PAGINATION_RESULTS}`,
        page: `${pageParam}`,
      })

      const { data } = await serviceGetPosts(params.toString())
      return data
    },

    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length > 0) return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className="space-y-2 pb-8">
      {posts.map((post, index) => {
        return (
          <li key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
            <Post
              showCover={index === 0}
              post={post}
              commentAmt={post.comments.length}
              bookmarked={!!post.bookmarks?.length}
            />
          </li>
        )
      })}
      {isFetchingNextPage && (
        <li className="pt-8">
          <CircleLoader />
        </li>
      )}
    </ul>
  )
}
