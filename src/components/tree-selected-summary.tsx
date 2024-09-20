import { CompanyTreeDataItem } from "@/stores/company-tree.store";
import GatewayIcon from "@/assets/gateway.svg?react";
import SensorIcon from "@/assets/sensor.svg?react";
import UploadIcon from "@/assets/upload.svg?react";

import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { memo } from "react";
import { itemIsComponent } from "@/lib/utils";

interface TreeSelectedItemSummaryProps {
  activeItem: CompanyTreeDataItem["data"] | null;
}

const TreeSelectedItemSummaryComponent = ({
  activeItem,
}: TreeSelectedItemSummaryProps) => {
  return (
    <div
      role="contentinfo"
      className="col-span-6 flex flex-col gap-2 h-full border-2"
    >
      {!!activeItem && (
        <>
          <header className="inline-flex h-14 w-full px-2 border-b-2">
            <div role="heading" className="inline-flex items-center gap-2">
              <h1 className="text-lg font-semibold">{activeItem.name}</h1>
              {"status" in activeItem && !!activeItem.status && (
                <Badge variant={activeItem.status} />
              )}
            </div>
          </header>
          <div
            role="region"
            aria-label="Asset Summary"
            className="h-fit pt-6 px-6 grid grid-flow-row grid-cols-6 gap-6 sm:grid-rows-[200px,2px,auto,2px] xs:grid-rows-[250px,2px,auto,2px] grid-rows-none overflow-auto"
          >
            <div className="h-full col-span-full flex flex-col gap-6 sm:flex-row">
              <label
                htmlFor="file-upload"
                className="h-[250px] sm:h-[200px] flex-shrink-0 sm:w-1/2 w-full hover:cursor-pointer"
              >
                <div className="h-full flex flex-col items-center justify-center rounded-lg border border-dashed border-blue-400 bg-blue-50 px-6 py-10">
                  <UploadIcon className="h-[42px] w-[42px]" />
                  <div className="flex flex-col text-sm text-center leading-6 text-blue-500">
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="col-span-1 hidden"
                    />
                    <p>Adicionar imagem do Ativo</p>
                  </div>
                </div>
              </label>
              <div className="flex flex-col gap-2 w-full">
                <div role="group" className="flex flex-col gap-2">
                  <span className="font-semibold text-gray-950">
                    Tipo de Equipamento
                  </span>
                  <p className="font-regular capitalize text-gray-500">
                    {("sensorType" in activeItem && activeItem.sensorType) ||
                      "Sem tipo"}
                  </p>
                </div>
                <hr className="col-span-full" />
                <div role="group" className="flex flex-col gap-2">
                  <span className="font-semibold text-gray-950">
                    Responsáveis
                  </span>
                  <div role="group" className="flex gap-2">
                    {activeItem.parentId && (
                      <Avatar className="h-6 w-6">E</Avatar>
                    )}
                    <p className="text-gray-500">
                      {activeItem.parentId || "Sem responsável"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="col-span-full" />
            {itemIsComponent(activeItem) && (
              <>
                <div
                  role="group"
                  className="col-span-6 sm:col-span-3 flex flex-col gap-2"
                >
                  <span className="text-sm font-semibold text-gray-950">
                    Sensor
                  </span>
                  <div role="group" className="flex gap-2">
                    <SensorIcon className="h-6 w-6" />
                    <p className="text-gray-500">{activeItem.sensorId}</p>
                  </div>
                </div>
                <div
                  role="group"
                  className="col-span-6 sm:col-span-3 flex flex-col gap-2"
                >
                  <span className="text-sm font-semibold text-gray-950">
                    Receptor
                  </span>
                  <div role="group" className="flex gap-2">
                    <GatewayIcon className="h-6 w-6" />
                    <p className="text-gray-500">{activeItem.gatewayId}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const TreeSelectedItemSummary = memo(
  TreeSelectedItemSummaryComponent,
  (prevProps, nextProps) =>
    prevProps.activeItem?.id === nextProps.activeItem?.id
);
