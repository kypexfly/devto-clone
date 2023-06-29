import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { UserNav } from "@/components/UserNav"

interface UserPageProps {
  params: {
    username: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params

  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      posts: true,
    },
  })

  if (!user) return notFound()

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
        <UserNav user={user} />
      </div>
    </div>
  )
}
