import { Component, SensorType, StatusKind } from "./component.model";
import { Location } from "./location.model";

export interface Asset {
  id: string;
  name: string;
  parentId: null | Component["id"] | Location["id"];
  locationId: null | Location["id"];
  sensorType: null | SensorType;
  status: null | StatusKind;
}
