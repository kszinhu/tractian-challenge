import { CompanyItemMap, TreeItem } from "@/stores/company-tree.store";

type BuildTreeMapWorkerData = TreeItem[];

onmessage = function (e: MessageEvent<BuildTreeMapWorkerData>) {
  const items = e.data;
  const treeMap: CompanyItemMap = new Map();

  const groupByParentId = (parentId: string | null) =>
    items.filter((item) => item.parentId === parentId);
  const groupByLocationId = (locationId: string) =>
    items.filter((item) => item.locationId === locationId);

  const buildItem = (item: TreeItem): void => {
    treeMap.set(item.id, {
      item,
      children: new Map(
        [...groupByLocationId(item.id), ...groupByParentId(item.id)].map(
          (child) => {
            buildItem(child);
            return [child.id, treeMap.get(child.id)!];
          }
        )
      ),
    });
  };

  const rootItems = groupByParentId(null);
  rootItems.forEach(buildItem);

  postMessage(treeMap);
};
