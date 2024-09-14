import { Location } from "./location.model";

type sensorType = "energy" | "vibration";
type StatusKind = "operating" | "alert";

export interface Asset {
  id: string;
  name: string;
  locationId: null | Location["id"];
  parentId: null | Asset["id"];
  sensorType: null | sensorType;
  status: null | StatusKind;
  sensorId?: string;
  gatewayId?: string;
}
