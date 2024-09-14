import { Asset } from "@/lib/models/asset.model";
import { create } from "zustand";
import { mutative } from "zustand-mutative";

export interface AssetState {
  assets: Map<Asset["id"], Asset>;
}

interface AssetActions {
  getAssets: (id: Asset["id"]) => Asset | undefined;
  setAssets: (assets: Asset[]) => void;
}

const useAssetsStore = create(
  mutative<AssetState & AssetActions>((set, get) => ({
    assets: new Map(),
    getAssets: (id) => get().assets.get(id),
    setAssets: (locations) => {
      set((state) => {
        const newLocations = new Map(
          locations.map((location) => [location.id, location])
        );
        return { ...state, locations: newLocations };
      });
    },
  }))
);

export default useAssetsStore;
