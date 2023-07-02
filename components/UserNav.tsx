"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { UserAvatar } from "./UserAvatar"

interface UserNav extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserNav({ user }: UserNav) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 [&_a]:flex-1" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="#">
            <Icons.bookmark className="inline mr-2 h-4 w-4" />
            Bookmarks
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">
            <Icons.settings className="inline mr-2 h-4 w-4" />
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
