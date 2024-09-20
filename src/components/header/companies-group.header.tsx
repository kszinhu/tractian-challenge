import { Link, useParams } from "@tanstack/react-router";

import useCompanyStore from "@/stores/companies.store";
import CompanyIcon from "@/assets/company.svg?react";

import { Button } from "../ui/button";

export const CompaniesLinks = () => {
  const { companyId: activeCompany } = useParams({ strict: false });
  const companies = useCompanyStore((state) => [...state.companies.values()]);

  return companies.map((company) => (
    <Button
      asChild
      key={company.id}
      className={`${activeCompany !== company.id && "bg-primary/50"}`}
    >
      <Link
        to={`/company/${company.id}`}
        disabled={activeCompany === company.id}
        className="flex items-center gap-2 px-2 select-none"
      >
        <CompanyIcon
          className="h-4 w-4"
          fill={activeCompany === company.id ? "#fff" : "#000"}
        />
        {company.name}
      </Link>
    </Button>
  ));
};
