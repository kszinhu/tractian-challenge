import { Company } from "@/lib/models/company.model";
import { create } from "zustand";
import { mutative } from "zustand-mutative";

export interface CompanyState {
  companies: Map<Company["id"], Company>;
}

interface CompanyActions {
  getCompany: (id: Company["id"]) => Company | undefined;
  setCompanies: (companies: Company[]) => void;
}

const useCompanyStore = create(
  mutative<CompanyState & CompanyActions>((set, get) => ({
    companies: new Map(),
    getCompany: (id: Company["id"]) => {
      return get().companies.get(id);
    },
    setCompanies: (companies) => {
      set((state) => {
        const newCompanies = new Map(
          companies.map((company) => [company.id, company])
        );
        return { ...state, companies: newCompanies };
      });
    },
  }))
);

export default useCompanyStore;
