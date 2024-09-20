import { memo } from "react";

import useCompanyTree, {
  CompanyTreeDataItem,
} from "@/stores/company-tree.store";

import { TreeSelectedItemSummary } from "./tree-selected-summary";
import { SearchTreeItemInput } from "./search-input";
import { TreeView } from "./tree-view/tree";
import { Skeleton } from "./ui/skeleton";

interface CompanyBoardTreeProps {
  items?: CompanyTreeDataItem[];
  loading?: boolean;
}

const CompanyBoardTreeComponent = ({
  items = [],
  loading,
}: CompanyBoardTreeProps) => {
  const activeItem = useCompanyTree((state) => state.activeItem);

  return (
    <div className="grid grid-flow-col grid-cols-10 grid-rows-1 gap-2 h-full overflow-hidden">
      <div className="col-span-4 flex flex-col h-full border-2 border-gray-200 rounded-lg">
        <SearchTreeItemInput name="treeItemName" />
        <div className="overflow-auto">
          <div role="navigation" className="overflow-auto">
            {loading ? (
              <div role="status" className="p-2 flex flex-col gap-3">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="ml-4 h-5 w-1/4" />
                <Skeleton className="ml-10 h-5 w-1/4" />
                <Skeleton className="ml-4 h-5 w-1/2" />
                <Skeleton className="ml-10 h-5 w-1/4" />
              </div>
            ) : (
              <TreeView data={items} />
            )}
          </div>
        </div>
      </div>
      <TreeSelectedItemSummary activeItem={activeItem} />
    </div>
  );
};

export const CompanyBoardTree = memo(
  CompanyBoardTreeComponent,
  (prevProps, nextProps) => {
    return prevProps.items && nextProps.items
      ? prevProps.loading === nextProps.loading &&
          prevProps.items.length === nextProps.items.length &&
          prevProps.items.every(
            (item, index) => nextProps.items && item === nextProps.items[index]
          )
      : false;
  }
);
