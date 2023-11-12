import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Icons } from "../Icons"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:text-primary-foreground/50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:text-destructive-foreground/50",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:text-accent-foreground/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:text-secondary-foreground/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground disabled:text-accent-foreground/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animate: {
        none: "",
        pushable: "transform active:scale-90 transition-transform",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animate: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      disabled,
      isLoading,
      size,
      animate,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className, animate }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
