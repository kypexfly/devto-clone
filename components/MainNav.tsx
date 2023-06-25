import Link from "next/link"

import { Icons } from "./Icons"
import { SideNav } from "./SideNav"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"

export function MainNav() {
  return (
    <header className="shadow-sm dark:shadow-white/10 bg-background top-0 sticky">
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
          <SheetContent side="left" className="pt-16 overflow-y-auto">
            <SideNav />
          </SheetContent>
        </Sheet>
        <Link className="font-bold" href="/">
          DEV Community
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
