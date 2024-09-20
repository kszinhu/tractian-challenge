import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "animate-pulse border-transparent shadow border p-[0.175rem] transition-colors before:content-[''] before:w-2 before:h-2 clip-rounded",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-500",
        operating: "bg-green-500 text-green-50",
        alert: "bg-red-500 text-red-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
