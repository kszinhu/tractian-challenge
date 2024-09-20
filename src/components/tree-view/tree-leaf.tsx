import { ForwardedRef, forwardRef, memo, useCallback, useMemo } from "react";

import { cn, itemIsComponent } from "@/lib/utils";
import { CompanyTreeDataItem } from "@/stores/company-tree.store";

import { selectedTreeVariants, treeVariants } from ".";
import { Icon, IconProps } from "../ui/icon";

interface TreeLeafProps extends React.HTMLAttributes<HTMLDivElement> {
  item: CompanyTreeDataItem;
  selectedItemId?: string;
  handleSelectChange: (item: CompanyTreeDataItem | undefined) => void;
}

export const TreeLeaf = memo(
  forwardRef<HTMLDivElement, TreeLeafProps>(
    (
      { className, item, selectedItemId, handleSelectChange, ...props },
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const isSelected = selectedItemId === item.id;
      const kindIcon: IconProps["icon"] | null = useMemo(
        () => item.kind,
        [item.kind]
      );
      const componentIcon: IconProps["icon"] | null = useMemo(
        () =>
          itemIsComponent(item.data)
            ? // priority is alert status, then sensor type
              item.data.status == "alert"
              ? item.data.status
              : item.data.sensorType
            : null,
        [item.data]
      );

      const onClick = useCallback(() => {
        handleSelectChange(item);
      }, [handleSelectChange, item]);

      return (
        <div
          ref={ref}
          className={cn(
            "flex text-left items-center py-2 cursor-pointer before:right-1",
            treeVariants(),
            className,
            isSelected && selectedTreeVariants()
          )}
          onClick={onClick}
          {...props}
        >
          <Icon icon={kindIcon} className="mr-2" />
          <span className="text-sm truncate">{item.name}</span>
          {!!componentIcon && <Icon icon={componentIcon} className="ml-2" />}
        </div>
      );
    }
  )
);

TreeLeaf.displayName = "TreeLeaf";
