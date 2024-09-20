import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { z } from "zod";

import { Company } from "@/lib/models/company.model";
import ThunderOutline from "@/assets/thunder-outline.svg?react";
import ExclamationCircle from "@/assets/exclamation-circle.svg?react";
import { FilterSchema } from "@/routes/company.$companyId";

import { ComponentBreadcrumb } from "./components.breadcrumb";
import { Button } from "./ui/button";

interface CompanyHeaderProps {
  companyId: Company["id"];
}

const CompanyHeaderComponent = ({ companyId }: CompanyHeaderProps) => {
  const form = useFormContext<z.infer<typeof FilterSchema>>();

  const toggleField = useCallback(
    (field: keyof z.infer<typeof FilterSchema>) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        form.setValue(field, !form.getValues(field));
        e.preventDefault();
      },
    [form]
  );

  const [onlyEnergy, onlyCritical] = form?.watch([
    "onlyEnergy",
    "onlyCritical",
  ]) ?? [false, false];

  return (
    <header
      role="rowheader"
      className="flex w-full justify-between items-center"
    >
      <ComponentBreadcrumb activeCompanyId={companyId ?? null} />
      <div className="flex items-center space-x-4">
        <Button
          variant={onlyEnergy ? "active" : "outline"}
          size="md"
          className="flex gap-2"
          onClick={toggleField("onlyEnergy")}
        >
          <ThunderOutline
            className={`h-4 w-4 ${onlyEnergy ? "fill-white" : "fill-primary"}`}
          />
          Sensor de energia
        </Button>
        <Button
          variant={onlyCritical ? "active" : "outline"}
          size="md"
          className="flex gap-2"
          onClick={toggleField("onlyCritical")}
        >
          <ExclamationCircle
            className={`h-4 w-4 ${onlyCritical ? "fill-white" : "fill-primary"}`}
          />
          Crítico
        </Button>
      </div>
    </header>
  );
};

export const CompanyBoardHeader = memo(CompanyHeaderComponent);
