"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { cn, partiallyShowEmail } from "@/lib/utils"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { UserAvatar } from "./UserAvatar"

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email" | "username">
}

export function UserNav({ user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-6 w-6 rounded-full">
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 [&_a]:flex-1" align="end" forceMount>
        <DropdownMenuItem className="font-normal" asChild>
          <Link
            href={`/${user.username}`}
            className={cn("flex flex-col !items-start space-y-1")}
          >
            <p className="text-sm font-medium leading-none">{`@${user.username}`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {partiallyShowEmail("ricardo@gmail.com", 3)}
            </p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/bookmarks">
            <Icons.bookmark className="mr-2 inline h-4 w-4" />
            Bookmarks
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Icons.settings className="mr-2 inline h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
