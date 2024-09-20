import { Asset } from "./asset.model";
import { Location } from "./location.model";

export type SensorType = "energy" | "vibration";
export type StatusKind = "operating" | "alert";

export interface Component {
  id: string;
  name: string;
  parentId: null | Asset["id"];
  locationId: null | Location["id"];
  sensorType: null | SensorType;
  status: null | StatusKind;
  sensorId?: string;
  gatewayId?: string;
}
