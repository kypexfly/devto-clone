import { notFound } from "next/navigation"
import createMDX from "@next/mdx"
import { serialize } from "next-mdx-remote/serialize"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

import { db } from "@/lib/db"

export async function useGetPost({ postId }: { postId: string }) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      tags: true,
      user: true,
    },
  })

  if (!post) return notFound()

  const source = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // rehypePlugins: [
      //   [rehypePrettyCode],
      //   {
      //     theme: "dark-plus",
      //     onVisitLine(node: any) {
      //       // Prevent lines from collapsing in `display: grid` mode, and allow empty
      //       // lines to be copy/pasted
      //       if (node.children.length === 0) {
      //         node.children = [{ type: "text", value: " " }]
      //       }
      //     },
      //     onVisitHighlightedLine(node: any) {
      //       node.properties.className.push("line--highlighted")
      //     },
      //     onVisitHighlightedWord(node: any) {
      //       node.properties.className = ["word--highlighted"]
      //     },
      //   },
      // ],
    },
  })

  return {
    post,
    source,
  }
}
