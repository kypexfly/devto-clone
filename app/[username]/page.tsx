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
  })

  if (!user) return notFound()

  return (
    <div>
      {user.username} Exists!
      <div>
        <UserNav user={user} />
      </div>
    </div>
  )
}
