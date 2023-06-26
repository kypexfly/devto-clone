import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/Button"

// TODO: Add a real links to the side nav

const sideOptions = [
  {
    url: "",
    label: "Home",
  },
  {
    url: "#",
    label: "Listings",
  },
  {
    url: "#",
    label: "Podcasts",
  },
  {
    url: "#",
    label: "Videos",
  },
  {
    url: "#",
    label: "Tags",
  },
]

interface SideNavProps extends React.HTMLAttributes<HTMLBaseElement> {}

export function SideNav({ className, ...props }: SideNavProps) {
  return (
    <aside className={cn(className)} {...props}>
      <nav className="sticky top-20">
        <ul className="flex flex-col">
          {sideOptions.map((option) => (
            <li key={option.label}>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start py-6"
                )}
                href={option.url}
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
