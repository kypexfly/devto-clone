import { Prisma } from "@prisma/client"

type PostPayload = Prisma.PostGetPayload<{
  select: {
    id: true
    createdAt: true
    cover: true
    title: true
    tags: true
    user: true
    comments: true
    bookmarks: true
    _count: {
      select: {
        reactions: true,
      }
    },
  }
}>
