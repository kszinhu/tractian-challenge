import { z } from "zod";

import { FilterSchema } from "@/routes/company.$companyId";
import { CompanyItemMap, TreeItem } from "@/stores/company-tree.store";
import { Component } from "../models/component.model";
import { itemIsComponent } from "../utils";

export interface FilterTreeWorkerData {
  filters: z.infer<typeof FilterSchema>;
  tree: CompanyItemMap;
}

export type FilterTreeWorkerResponse = MessageEvent<CompanyItemMap>;

function matchItemName(item: TreeItem, search: string): boolean {
  return item.name.toUpperCase().includes(search.toUpperCase());
}

function matchItemStatus(item: TreeItem, status: Component["status"]): boolean {
  return itemIsComponent(item) && item.status === status;
}

function matchItemSensorType(
  item: TreeItem,
  sensorType: Component["sensorType"]
): boolean {
  return itemIsComponent(item) && item.sensorType === sensorType;
}

onmessage = function (e: MessageEvent<FilterTreeWorkerData>) {
  const { filters, tree } = e.data;
  const filteredMap: CompanyItemMap = new Map();

  const filterTree = (tree: CompanyItemMap, filteredTree: CompanyItemMap) => {
    for (const [id, { item, children }] of tree) {
      // Should preserve the item path if it matches the filter
      // to this resolve a children first

      const childrenFiltered = new Map();

      if (children.size) {
        filterTree(children, childrenFiltered);
        if (childrenFiltered.size)
          filteredTree.set(id, { item, children: childrenFiltered });
      }

      if (
        (filters.treeItemName && !matchItemName(item, filters.treeItemName)) ||
        (filters.onlyCritical && !matchItemStatus(item, "alert")) ||
        (filters.onlyEnergy && !matchItemSensorType(item, "energy"))
      )
        continue;

      filteredTree.set(id, { item, children: childrenFiltered });
    }
  };

  filterTree(tree, filteredMap);

  postMessage(filteredMap);
};
