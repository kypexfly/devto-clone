import { cn } from "@/lib/utils"

import { Icons } from "./Icons"
import { NavLink } from "./NavLink"
import { buttonVariants } from "./ui/Button"

// TODO: Add a real links to the side nav

const sideOptions = [
  {
    url: "/",
    label: "Home",
    icon: Icons.home,
  },
  {
    url: "/t",
    label: "Tags",
    icon: Icons.tag,
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
              <NavLink
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start py-6"
                )}
                href={option.url}
              >
                <option.icon className="mr-2 h-4 w-4" />
                {option.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
