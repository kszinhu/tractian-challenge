import { cva } from "class-variance-authority";
import { CompanyTreeKind } from "@/lib/models/company.model";
import AssetIcon from "@/assets/asset.svg?react";
import ComponentIcon from "@/assets/component.svg?react";
import LocationIcon from "@/assets/location.svg?react";

export const treeVariants = cva(
  "group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 px-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10"
);

export const selectedTreeVariants = cva(
  "before:opacity-100 before:bg-accent/70 text-accent-foreground"
);

export const treeIconMap: Record<
  CompanyTreeKind,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  asset: AssetIcon,
  component: ComponentIcon,
  location: LocationIcon,
};
