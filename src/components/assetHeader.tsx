import { useMemo } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { SlashIcon } from '@radix-ui/react-icons'
import useCompanyStore from '@/stores/companies.store'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'

export const AssetHeader = () => {
  const routeState = useRouterState({ select: state => state.location.state })
  const companies = useCompanyStore(state => state.companies)
  const activeCompany = useMemo(() => companies.get(routeState?.activeCompanyId ?? ''), [routeState?.activeCompanyId, companies])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className='font-bold text-black'>
            <Link to="/" className='font-bold'>Ativos</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      {activeCompany && 
        (
          <BreadcrumbPage>
            <BreadcrumbLink asChild>
              <Link to={`/company/${activeCompany.id}`} state={{ activeCompanyId: activeCompany.id }}>{activeCompany.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbPage>
        )
      }
      </BreadcrumbList>
    </Breadcrumb>
  )
}
