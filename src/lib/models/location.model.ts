import { Company } from "./company.model";

export interface Location {
  id: string;
  name: string;
  parentId: null | Company["id"];
}
