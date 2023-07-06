"use client"

import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useRef } from "react"

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config/post"
import { PostPayload } from "@/types/post"

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

  const { data, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage } =
    useInfiniteQuery(
      ["infinite-query"],
      async ({ pageParam = 1 }) => {
        const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`

        const { data } = await axios.get<PostPayload[]>(query)
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
              <Post showCover post={post} commentAmt={post.comments.length} />
            </li>
          )
        }

        // Check if last post
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post post={post} commentAmt={post.comments.length} />
            </li>
          )
        }

        return (
          <li key={post.id}>
            <Post post={post} commentAmt={post.comments.length} />
          </li>
        )
      })}

      {/* TODO: Show skeleton correctly */}
      {/* {isFetchingNextPage && (
        <li>
          <PostSkeleton />
          <PostSkeleton />
        </li>
      )} */}
    </ul>
  )
}
