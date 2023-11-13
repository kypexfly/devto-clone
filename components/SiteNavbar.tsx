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
    <header className="sticky top-0 z-10 border-b border-b-border bg-white dark:bg-zinc-900">
      <div className="container flex items-center justify-between p-4">
        {/* SideNav when mobile */}
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="inline-block px-2 md:hidden"
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

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {session ? (
            <>
              <Link className={buttonVariants({variant: "outline", size: "sm" })} href="/new">
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
