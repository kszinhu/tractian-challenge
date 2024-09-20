export interface Company {
  id: string;
  name: string;
}

export enum CompanyTreeKind {
  Asset = "asset",
  Component = "component",
  Location = "location",
}
