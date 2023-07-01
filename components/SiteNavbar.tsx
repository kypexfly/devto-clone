import Link from "next/link"

import { getAuthSession } from "@/lib/auth"

import { Icons } from "./Icons"
import { SideNav } from "./SideNav"
import { ThemeToggle } from "./ThemeToggle"
import { Button, buttonVariants } from "./ui/Button"
import { ScrollArea } from "./ui/ScrollArea"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
import { UserNav } from "./UserNav"

export async function SiteNavbar() {
  const session = await getAuthSession()

  return (
    <header className="border-b bg-background top-0 sticky z-10">
      <div className="container flex items-center justify-between py-4">
        {/* SideNav when mobile */}
        <div className="flex items-center gap-3">
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
            DEV <span className="hidden sm:inline">Community</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {session ? (
            <>
              <Link className={buttonVariants({ size: "sm" })} href="/new">
                Create Post
              </Link>
              <UserNav user={session.user} />
            </>
          ) : (
            <Link href="/login" className={buttonVariants({ size: "sm" })}>
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}