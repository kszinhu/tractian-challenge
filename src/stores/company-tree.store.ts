import { create } from "zustand";
import { mutative } from "zustand-mutative";

import { TreeDataItem } from "@/components/tree-view/tree";
import { Company, CompanyTreeKind } from "@/lib/models/company.model";
import { Component } from "@/lib/models/component.model";
import { Asset } from "@/lib/models/asset.model";
import { Location } from "@/lib/models/location.model";
import { FilterSchema } from "@/routes/company.$companyId";

import FilterTreeWorker from "@/lib/web-workers/filterTreeMap.worker?worker";
import {
  FilterTreeWorkerData,
  FilterTreeWorkerResponse,
} from "@/lib/web-workers/filterTreeMap.worker";

export interface CompanyTreeDataItem extends TreeDataItem {
  id: string;
  name: string;
  parentId: string | null;
  kind: CompanyTreeKind;
  data: Asset | Component | Location;
  children?: CompanyTreeDataItem[];
}

export type TreeItem = {
  id: string;
  name: string;
  kind: CompanyTreeKind;
  parentId: string | null;
  locationId?: string;
} & (Asset | Component | Location);
export type CompanyItemMap = Map<
  Company["id"],
  { item: TreeItem; children: CompanyItemMap }
>;
export type CompanyTreeItemMap = Map<Company["id"], CompanyItemMap>;

export interface CompanyTreeState {
  tree: CompanyTreeItemMap;
  filteredTree: CompanyTreeItemMap;
  mappedTree: Map<Company["id"], Map<CompanyTreeKind, CompanyTreeDataItem[]>>;
  activeItem: CompanyTreeDataItem["data"] | null;
}

interface CompanyTreeActions {
  // API returns all items at once, so we don't need to add them one by one
  // addCompanyItems: (
  //   companyId: Company["id"],
  //   items: CompanyTreeDataItem[]
  // ) => void;
  setCompanyTree: (companyId: Company["id"], tree: CompanyItemMap) => void;
  setActiveItem: (item: CompanyTreeDataItem["data"]) => void;
  filterBy: (
    companyId: Company["id"],
    filters: (typeof FilterSchema)["_output"]
  ) => void;
}

const useCompanyTree = create(
  mutative<CompanyTreeState & CompanyTreeActions>((set, get) => ({
    tree: new Map(),
    filteredTree: new Map(),
    mappedTree: new Map(),
    activeItem: null,
    setCompanyTree: (companyId, tree) => {
      set((state) => {
        const newTree = new Map(state.tree).set(companyId, tree);

        return {
          ...state,
          tree: newTree,
          filteredTree: newTree,
          activeItem: null,
        };
      });
    },
    filterBy: (companyId, filters) => {
      const companyTree = get().tree.get(companyId);
      if (!companyTree) return null;

      const worker = new FilterTreeWorker();

      worker.postMessage({
        filters,
        tree: companyTree,
      } as FilterTreeWorkerData);

      set((state) => {
        return {
          ...state,
          loading: true,
        };
      });

      worker.onmessage = (e: FilterTreeWorkerResponse) => {
        worker.terminate();
        const filteredTree = e.data;

        set((state) => {
          return {
            ...state,
            filteredTree: new Map().set(companyId, filteredTree),
          };
        });
      };
    },
    setActiveItem: (item) => {
      set((state) => {
        return {
          ...state,
          activeItem: item,
        };
      });
    },
  }))
);

export default useCompanyTree;
