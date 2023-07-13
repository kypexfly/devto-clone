import { cn } from "@/lib/utils"

import { Card, CardHeader } from "./ui/Card"

interface SideAditionalProps extends React.HTMLAttributes<HTMLBaseElement> {}

export function SideAditional({ className, ...props }: SideAditionalProps) {
  return (
    <aside className={cn(className)} {...props}>
      <Card className="border-0 bg-white shadow-none dark:bg-zinc-900">
        <CardHeader>Listings</CardHeader>
      </Card>
      <Card className="border-0 bg-white shadow-none dark:bg-zinc-900">
        <CardHeader>#discuss</CardHeader>
      </Card>
      <Card className="border-0 bg-white shadow-none dark:bg-zinc-900"></Card>
    </aside>
  )
}
