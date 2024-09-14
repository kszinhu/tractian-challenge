import { Location } from "@/lib/models/location.model";
import { create } from "zustand";
import { mutative } from "zustand-mutative";

export interface LocationState {
  locations: Map<Location["id"], Location>;
}

interface LocationActions {
  getLocation: (id: Location["id"]) => Location | undefined;
  setLocations: (locations: Location[]) => void;
}

const useLocationStore = create(
  mutative<LocationState & LocationActions>((set, get) => ({
    locations: new Map(),
    getLocation: (id) => get().locations.get(id),
    setLocations: (locations) => {
      set((state) => {
        const newLocations = new Map(
          locations.map((location) => [location.id, location])
        );
        return { ...state, locations: newLocations };
      });
    },
  }))
);

export default useLocationStore;
