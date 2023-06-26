import { Badge, BadgeProps } from "./ui/badge"

export default function Tag({ children, ...props }: BadgeProps) {
  return (
    <Badge {...props} variant="secondary">
      <span>#</span>
      {children}
    </Badge>
  )
}
