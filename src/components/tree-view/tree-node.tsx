import { memo, useCallback, useState } from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { CompanyTreeDataItem } from "@/stores/company-tree.store";

import { TreeItem } from "./tree-item";
import { selectedTreeVariants, treeVariants } from ".";
import { AccordionTrigger, AccordionContent } from "./tree";
import { Icon } from "../ui/icon";

interface TreeNodeProps {
  item: CompanyTreeDataItem;
  handleSelectChange: (item: CompanyTreeDataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
}

export const TreeNode = memo(
  ({
    item,
    handleSelectChange,
    expandedItemIds,
    selectedItemId,
  }: TreeNodeProps) => {
    const isInitiallyExpanded = expandedItemIds.includes(item.id);
    const [value, setValue] = useState<string[]>(
      isInitiallyExpanded ? [item.id] : []
    );

    const handleValueChange = useCallback(
      (s: string[]) => {
        if (item.children?.length) setValue(s);
      },
      [item]
    );

    return (
      <AccordionPrimitive.Root
        type="multiple"
        value={value}
        onValueChange={handleValueChange}
      >
        <AccordionPrimitive.Item value={item.id}>
          <AccordionTrigger
            className={cn(
              treeVariants(),
              selectedItemId === item.id && selectedTreeVariants()
            )}
            hidden={!item.children?.length}
            onClick={() => {
              handleSelectChange(item);
            }}
          >
            <Icon icon={item.kind} variant="treeSelector" />
            <span className="text-sm truncate">{item.name}</span>
          </AccordionTrigger>
          <AccordionContent className="ml-4 pl-1 border-l">
            <TreeItem
              data={item.children || []}
              selectedItemId={selectedItemId}
              handleSelectChange={handleSelectChange}
              expandedItemIds={expandedItemIds}
            />
          </AccordionContent>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    );
  }
);

TreeNode.displayName = "TreeNode";
