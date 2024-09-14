import { builder } from "./builder";
import { Company } from "../models/company.model";
import { Location } from "../models/location.model";
import { Asset } from "../models/asset.model";

export const getCompanies = builder.createRequest<Company[]>({
  method: "GET",
  endpoint: "companies",
});

export const getLocationsByCompany = builder.createRequest<Location[]>({
  method: "GET",
  endpoint: "companies/:companyId/locations",
});

export const getAssetsByCompany = builder.createRequest<Asset[]>({
  method: "GET",
  endpoint: "companies/:companyId/assets",
});

export const getCompanyTree = async ({
  id,
  signal,
}: {
  id: Company["id"];
  signal?: AbortSignal;
}) => {
  return Promise.all([
    getAssetsByCompany.setParams({ companyId: id }).send({ signal }),
    getLocationsByCompany.setParams({ companyId: id }).send({ signal }),
  ]).then(([assets, locations]) => ({ locations, assets }));
};
