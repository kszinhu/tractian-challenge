import { AssetHeader } from '@/components/assetHeader'
import { getCompanies } from '@/lib/api/company.api'
import useCompanyStore from '@/stores/companies.store'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { setCompanies, companies } = useCompanyStore(state => state)
  
  useEffect(() => {
    const abortController = new AbortController()

    const fetchCompanies = async () => {
      await getCompanies.send({ signal: abortController.signal })
        .then(data => { setCompanies(data) })
        .catch(error => { console.error(error) })
    }

    if (!companies.size) fetchCompanies()

    return () => {
      abortController.abort()
    }
  }, [setCompanies, companies.size])

  return (
    <>
      <h3 className="italic">Nenhuma empresa selecionada</h3>
    </>
  )
}