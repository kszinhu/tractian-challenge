import { ForwardedRef, forwardRef, memo, useMemo } from "react";

import { CompanyTreeDataItem } from "@/stores/company-tree.store";

import { TreeProps } from "./tree";
import { TreeNode } from "./tree-node";
import { TreeLeaf } from "./tree-leaf";

interface TreeItemProps extends TreeProps {
  selectedItemId?: string;
  handleSelectChange: (item: CompanyTreeDataItem | undefined) => void;
  expandedItemIds: string[];
}

export const TreeItem = memo(
  forwardRef<HTMLDivElement, TreeItemProps>(
    (
      {
        className,
        data,
        selectedItemId,
        handleSelectChange,
        expandedItemIds,
        ...props
      },
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const itemsArray = useMemo(
        () => (Array.isArray(data) ? data : [data]),
        [data]
      );

      return (
        <div ref={ref} role="tree" className={className} {...props}>
          <ul>
            {itemsArray.map((item) => (
              <li key={item.id}>
                {item.children?.length ? (
                  <TreeNode
                    item={item}
                    selectedItemId={selectedItemId}
                    expandedItemIds={expandedItemIds}
                    handleSelectChange={handleSelectChange}
                  />
                ) : (
                  <TreeLeaf
                    item={item}
                    selectedItemId={selectedItemId}
                    handleSelectChange={handleSelectChange}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  )
);

TreeItem.displayName = "TreeItem";
