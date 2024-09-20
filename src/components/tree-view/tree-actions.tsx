import { memo, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface TreeActionsProps {
  isSelected: boolean;
}

export const TreeActions = memo(
  ({ children, isSelected }: PropsWithChildren<TreeActionsProps>) => (
    <div
      className={cn(
        isSelected ? "block" : "hidden",
        "absolute right-3 group-hover:block"
      )}
    >
      {children}
    </div>
  )
);

TreeActions.displayName = "TreeActions";
