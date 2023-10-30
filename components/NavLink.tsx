"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn, isCurrentPathOrChild } from "@/lib/utils"

type LinkProps = React.ComponentProps<typeof Link>

interface NavLinkProps extends LinkProps {}

export function NavLink({ className, children, href, ...props }: NavLinkProps) {
  const currentPath = usePathname()
  return (
    <Link
      className={
        (cn(
          "p-2 text-muted-foreground transition-colors hover:text-foreground",
          isCurrentPathOrChild(currentPath, href.toString()) && "bg-white"
        ),
        className)
      }
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
