import Image from "next/image"
import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Icons } from "@/components/Icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props} className={className}>
      {user.image ? (
        <div className="relative aspect-square">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-3 w-3" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
