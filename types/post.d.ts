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
    bookmark: true
  }
}>
