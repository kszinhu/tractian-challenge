import {
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import useCompanyTree, {
  CompanyTreeDataItem,
} from "@/stores/company-tree.store";

import { TreeItem } from "./tree-item";
import { CompanyTreeKind } from "@/lib/models/company.model";

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface TreeDataItem {
  id: string;
  name: string;
  icon?: IconType;
  selectedIcon?: IconType;
  openIcon?: IconType;
  children?: TreeDataItem[];
  actions?: ReactNode;
  onClick?: VoidFunction;
}

export type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: CompanyTreeDataItem[] | CompanyTreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: CompanyTreeDataItem | undefined) => void;
  expandAll?: boolean;
};

export const TreeView = memo(
  forwardRef<HTMLDivElement, TreeProps>(
    (
      { data, initialSelectedItemId, expandAll, className, ...props },
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
        initialSelectedItemId
      );
      const selectItem = useCompanyTree((state) => state.setActiveItem);

      const handleSelectChange = useCallback(
        (item: CompanyTreeDataItem | undefined) => {
          setSelectedItemId(item?.id);
          if (item && item.kind != CompanyTreeKind.Location)
            selectItem(item.data);
        },
        [selectItem]
      );

      const expandedItemIds = useMemo(() => {
        if (!initialSelectedItemId) return [];

        const ids: string[] = [];

        const walkTreeItems = (
          items: CompanyTreeDataItem[] | CompanyTreeDataItem,
          targetId: string
        ): boolean => {
          if (Array.isArray(items)) {
            for (const treeItem of items) {
              ids.push(treeItem.id);

              if (walkTreeItems(treeItem, targetId) && !expandAll) return true;
              if (!expandAll) ids.pop();
            }
          } else {
            if (items.id === targetId) return true;
            if (items.children) return walkTreeItems(items.children, targetId);
          }

          return false;
        };

        walkTreeItems(data, initialSelectedItemId);
        return ids;
      }, [data, expandAll, initialSelectedItemId]);

      return (
        <div className={cn("overflow-hidden relative p-2", className)}>
          <TreeItem
            data={data}
            ref={ref}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            {...props}
          />
        </div>
      );
    }
  )
);

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  hidden?: boolean;
}

export const AccordionTrigger = memo(
  forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
  >(({ className, children, hidden, ...props }, ref) => (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 w-full items-center py-2 transition-all first:[&[data-state=open]>svg]:rotate-90",
          className
        )}
        {...props}
      >
        <ChevronRightIcon
          className={`${hidden && "hidden"} h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 mr-1`}
        />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ))
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

export const AccordionContent = memo(
  forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    AccordionContentProps
  >(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      <div className="pb-1 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  ))
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

TreeView.displayName = "TreeView";
