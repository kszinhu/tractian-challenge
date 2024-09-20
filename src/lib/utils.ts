import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Component } from "./models/component.model";
import { Asset } from "./models/asset.model";
import { Location } from "./models/location.model";
import {
  CompanyItemMap,
  CompanyTreeDataItem,
} from "@/stores/company-tree.store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function itemIsComponent(
  asset: Asset | Component | Location
): asset is Component {
  return "sensorType" in asset;
}

export function transformCompanyItemsToArray(
  itemMap: CompanyItemMap
): CompanyTreeDataItem[] {
  const items: CompanyTreeDataItem[] = [];

  for (const [, { item, children }] of itemMap) {
    items.push({
      id: item.id,
      name: item.name,
      kind: item.kind,
      parentId: item.parentId,
      data: item,
      children: transformCompanyItemsToArray(children),
    });
  }

  return items;
}
