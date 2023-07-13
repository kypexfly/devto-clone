import { DiscussCard } from "@/app/(home)/DiscussCard"
import { cn } from "@/lib/utils"


interface SideAditionalProps extends React.HTMLAttributes<HTMLBaseElement> {}

export function SideAditional({ className, ...props }: SideAditionalProps) {
  return (
    <aside className={cn(className)} {...props}>
      <DiscussCard />
    </aside>
  )
}
