import { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CompanyTreeKind } from "@/lib/models/company.model";
import AssetIcon from "@/assets/asset.svg?react";
import ComponentIcon from "@/assets/component.svg?react";
import LocationIcon from "@/assets/location.svg?react";
import BoltIcon from "@/assets/bolt.svg?react";
import { SensorType, StatusKind } from "@/lib/models/component.model";
import { IconType } from "../tree-view/tree";
import { Badge } from "./badge";

const kindIconsMap: Record<CompanyTreeKind, [IconType, string]> = {
  [CompanyTreeKind.Asset]: [AssetIcon, ""],
  [CompanyTreeKind.Location]: [LocationIcon, ""],
  [CompanyTreeKind.Component]: [ComponentIcon, ""],
};

const statusStylesMap: Record<StatusKind, string> = {
  alert:
    "border p-[0.175rem] transition-colors before:content-[''] before:w-2 before:h-2 clip-rounded bg-red-500",
  operating:
    "border p-[0.175rem] transition-colors before:content-[''] before:w-2 before:h-2 clip-rounded bg-green-500",
};

const sensorTypeIconsMap: Record<SensorType, [IconType, string]> = {
  energy: [BoltIcon, "fill-green-500 h-4"],
  vibration: [BoltIcon, "fill-blue-500 h-4"],
};

const iconVariants = cva("h-5 w-5 shrink-0", {
  variants: {
    variant: {
      default: "",
      treeSelector: "mr-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface IconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  icon:
    | keyof typeof kindIconsMap
    | keyof typeof statusStylesMap
    | keyof typeof sensorTypeIconsMap;
}

const Icon = memo(({ className, variant, icon, ...props }: IconProps) => {
  const iconStyles = statusStylesMap[icon as keyof typeof statusStylesMap];
  const [IconComponent, styles]: [IconType, string] =
    kindIconsMap[icon as keyof typeof kindIconsMap] ||
    sensorTypeIconsMap[icon as keyof typeof sensorTypeIconsMap] ||
    [];

  if (iconStyles) {
    return (
      <Badge
        className="ml-2"
        variant={icon as keyof typeof statusStylesMap}
        {...props}
      />
    );
  } else {
    return (
      !!IconComponent && (
        <IconComponent
          className={cn(iconVariants({ variant }), className, styles)}
        />
      )
    );
  }
});

export { Icon, iconVariants };
