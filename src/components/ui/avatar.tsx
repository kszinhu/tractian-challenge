import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "p-[0.175rem] clip-rounded",
  {
    variants: {
      variant: {
        default:
          "animate-pulse border-transparent bg-gray-200 text-gray-500 shadow",
        fallback:
          "flex items-center justify-center bg-gray-200 text-gray-500 shadow select-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {
      src?: string
    }

function Avatar({ className, variant, src, children, ...props }: React.PropsWithChildren<AvatarProps>) {
  return src ? (
    <img
      src={src}
      className={cn(avatarVariants({ variant }), className)}
      {...props}
    />
  ) : (
    <div className={cn(avatarVariants({ variant: 'fallback' }), className)} {...props}>
      <span className='font-lg text-white'>{children}</span>
    </div>
  )
}

export { Avatar, avatarVariants }
