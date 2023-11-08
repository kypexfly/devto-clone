"use client"

import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"

import { PostPayload } from "@/types/post"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config/post"
import { serviceGetPosts } from "@/lib/api/posts/posts"

import { Post } from "./Post"

interface PostFeedProps {
  initialPosts: PostPayload[]
}

export default function PostFeed({ initialPosts }: PostFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null)

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage } = useInfiniteQuery(
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
      getNextPageParam: (_, pages) => {
        return pages.length + 1
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
    <ul>
      {posts.map((post, index) => {
        // Check if first post
        if (index === 0) {
          return (
            <li key={post.id}>
              <Post
                showCover
                post={post}
                commentAmt={post.comments.length}
                bookmarked={!!post?.bookmarks?.length}
              />
            </li>
          )
        }

        // Check if last post
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                bookmarked={!!post?.bookmarks?.length}
              />
            </li>
          )
        }

        return (
          <li key={post.id}>
            <Post
              post={post}
              commentAmt={post.comments.length}
              bookmarked={!!post?.bookmarks?.length}
            />
          </li>
        )
      })}
    </ul>
  )
}
