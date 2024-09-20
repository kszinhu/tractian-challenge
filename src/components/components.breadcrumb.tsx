import { memo, useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { SlashIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import useCompanyStore from "@/stores/companies.store";
import { Company } from "@/lib/models/company.model";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { getCompanies } from "@/lib/api/company.api";

const ComponentBreadcrumbComponent = ({
  activeCompanyId,
}: {
  activeCompanyId: null | Company["id"];
}) => {
  const [companies, setCompanies] = useCompanyStore(
    useShallow((state) => [state.companies, state.setCompanies])
  );
  const activeCompany = useMemo(
    () => companies.get(activeCompanyId ?? ""),
    [activeCompanyId, companies]
  );

  useEffect(() => {
    if (activeCompany) return;

    const abortController = new AbortController();

    const fetchCompanies = async () => {
      await getCompanies
        .send({ signal: abortController.signal })
        .then((data) => {
          setCompanies(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (!companies.size) fetchCompanies();

    return () => {
      abortController.abort();
    };
  }, [activeCompany, companies, setCompanies]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="text-lg font-semibold text-black">
            <Link to="/" className="font-bold">
              Ativos
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        {activeCompany && (
          <BreadcrumbPage>
            <BreadcrumbItem>
              <span className="text-sm text-slate-600">
                {activeCompany.name}
              </span>
            </BreadcrumbItem>
          </BreadcrumbPage>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const ComponentBreadcrumb = memo(
  ComponentBreadcrumbComponent,
  (prevProps, nextProps) =>
    prevProps.activeCompanyId === nextProps.activeCompanyId
);
