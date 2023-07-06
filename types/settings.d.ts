import { Prisma } from "@prisma/client"

type ExtendedUserPayload = Prisma.UserGetPayload<{
  include: {
    details: true
  }
}>
