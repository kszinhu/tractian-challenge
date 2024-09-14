import { useMemo } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '../ui/button'
import useCompanyStore from '@/stores/companies.store'
import CompanyIcon from '@/assets/company.svg?react'

export const CompaniesLinks = () => {
  const routeState = useRouterState({ select: state => state.location.state })
  const companies = useCompanyStore(state => [...state.companies.values()])
  const activeCompany = useMemo(() => routeState?.activeCompanyId, [routeState])

  return companies.map(company => (
    <Button asChild key={company.id} className={`${activeCompany !== company.id && 'bg-primary/50'}`}>
      <Link to={`/company/${company.id}`} state={{ activeCompanyId: company.id }}  className=" flex items-center gap-2 px-2">
        <CompanyIcon className="h-4 w-4" fill={activeCompany === company.id ? '#fff' : '#000'} />
        {company.name}
      </Link>
    </Button>
  ))
}
