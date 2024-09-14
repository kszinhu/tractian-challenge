import { useEffect } from 'react'
import { getCompanyTree } from '@/lib/api/company.api'
import { TreeView, TreeDataItem } from '@/components/tree-view'
import useAssetsStore from '@/stores/assets.store'
import useLocationStore from '@/stores/locations.store'
import { createFileRoute } from '@tanstack/react-router'
import { AssetHeader } from '@/components/assetHeader'

const data: TreeDataItem[] = [
  {
    id: '1',
    name: 'Item 1',
    children: [
      {
        id: '2',
        name: 'Item 1.1',
        children: [
          {
            id: '3',
            name: 'Item 1.1.1',
          },
          {
            id: '4',
            name: 'Item 1.1.2',
          },
        ],
      },
      {
        id: '5',
        name: 'Item 1.2',
      },
    ],
  },
  {
    id: '6',
    name: 'Item 2',
  },
];

export const Route = createFileRoute('/company/$companyId')({
  loader: ({ params }) => getCompanyTree({ id: params.companyId }),
  component: CompanyComponent,
})

function CompanyComponent() {
  const { locations, assets } = Route.useLoaderData()
  const setLocations = useLocationStore(state => state.setLocations)
  const setAssets = useAssetsStore(state => state.setAssets)

  useEffect(() => {
    setLocations(locations)
    setAssets(assets)
  }, [locations, assets, setLocations, setAssets])

  return (
    <>
      <TreeView data={data} />
    </>
  )
}