import { Badge, BadgeProps } from "./ui/badge"

export default function Tag({ children, ...props }: BadgeProps) {
  return (
    <Badge {...props} variant="secondary" className="hover:border-blue-500 dark:hover:border-blue-600 border-2 text-sm">
      <span>#</span>
      {children}
    </Badge>
  )
}
