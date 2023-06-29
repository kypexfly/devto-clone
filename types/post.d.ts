import { Prisma } from "@prisma/client"

type PostPayload = Prisma.PostGetPayload<{
  select: {
    id: true
    createdAt: true
    title: true
    tags: true
    user: true
    comments: true
  }
}>
