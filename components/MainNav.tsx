import Link from "next/link"

import { getAuthSession } from "@/lib/auth"

import { Icons } from "./Icons"
import { SideNav } from "./SideNav"
import { ThemeToggle } from "./ThemeToggle"
import { Button, buttonVariants } from "./ui/Button"
import { ScrollArea } from "./ui/ScrollArea"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
import { UserNav } from "./UserNav"

export async function MainNav() {
  const session = await getAuthSession()

  return (
    <header className="border-b bg-background top-0 sticky z-10">
      <div className="container flex items-center justify-between py-4">
        {/* SideNav when mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="md:hidden inline-block px-2"
              size="sm"
              variant="secondary"
            >
              <Icons.menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pt-16">
            <ScrollArea className="h-full">
              <SideNav />
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link className="font-bold" href="/">
          DEV Community
        </Link>
        <div className="flex items-center space-x-2">
          {session ? (
            <>
              <Link className={buttonVariants()} href="/new">
                Create Post
              </Link>
              <UserNav user={session.user} />
            </>
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Log in
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
