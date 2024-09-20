import Worker from "@/lib/web-workers/buildTreeMap.worker?worker";
import { CompanyItemMap } from "@/stores/company-tree.store";

import { builder } from "./builder";
import { Company, CompanyTreeKind } from "../models/company.model";
import { Location } from "../models/location.model";
import { Component } from "../models/component.model";
import { Asset } from "../models/asset.model";

export const getCompanies = builder.createRequest<Company[]>({
  method: "GET",
  endpoint: "companies",
});

export const getLocationsByCompany = builder.createRequest<Location[]>({
  method: "GET",
  endpoint: "companies/:companyId/locations",
});

export const getComponentsByCompany = builder.createRequest<
  (Component | Asset)[]
>({
  method: "GET",
  endpoint: "companies/:companyId/assets",
});

type CompanyTreeRequestParams = {
  id: Company["id"];
  signal?: AbortSignal;
};

export const getCompanyTreeItems = async ({
  id,
  signal,
}: CompanyTreeRequestParams) => {
  return Promise.all([
    getComponentsByCompany.setParams({ companyId: id }).send({ signal }),
    getLocationsByCompany.setParams({ companyId: id }).send({ signal }),
  ]).then(([assets, locations]) => {
    const buildTreeWorker = new Worker();

    buildTreeWorker.postMessage([
      ...assets.map((asset) => ({
        ...asset,
        kind: asset.sensorType
          ? CompanyTreeKind.Component
          : CompanyTreeKind.Asset,
      })),
      ...locations.map((location) => ({
        ...location,
        kind: CompanyTreeKind.Location,
      })),
    ]);

    return new Promise<CompanyItemMap>((resolve) => {
      buildTreeWorker.onmessage = (event) => {
        resolve(event.data);
      };
    });
  });
};
