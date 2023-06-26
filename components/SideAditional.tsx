import { cn } from "@/lib/utils"

import { Card, CardHeader } from "./ui/Card"

interface SideAditionalProps extends React.HTMLAttributes<HTMLBaseElement> {}

export function SideAditional({ className, ...props }: SideAditionalProps) {
  return (
    <aside className={cn(className)} {...props}>
      <Card className="shadow-none bg-white dark:bg-zinc-900 border-0">
        <CardHeader>Listings</CardHeader>
      </Card>
      <Card className="shadow-none bg-white dark:bg-zinc-900 border-0">
        <CardHeader>#discuss</CardHeader>
      </Card>
      <Card className="shadow-none bg-white dark:bg-zinc-900 border-0"></Card>
    </aside>
  )
}
