import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Header } from '@/components/header/header'
import { AssetHeader } from '@/components/assetHeader'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr />
      <div className='h-[calc(100vh-3rem)] p-5 bg-slate-50'>
        <main className="h-full p-4 flex-col gap-3 bg-background border border-slate-300 rounded-lg">
          <AssetHeader />
          <div className="flex flex-col gap-2">
            <Outlet />
          </div>
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})