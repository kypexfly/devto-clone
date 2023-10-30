import { Badge, BadgeProps } from "./ui/Badge"

export function Tag({ children, ...props }: BadgeProps) {
  return (
    <Badge
      {...props}
      variant="secondary"
      className="border-2 text-sm hover:bg-blue-300 dark:hover:bg-blue-600"
    >
      <span>#</span>
      {children}
    </Badge>
  )
}
