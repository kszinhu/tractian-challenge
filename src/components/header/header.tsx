"use server";

import { Link } from '@tanstack/react-router'
import TractianLogo from '@/assets/logo.svg?react'
import { CompaniesLinks } from './companies'

export const Header = () => {
  return (
    <header className="bg-platformHeader px-4 flex items-center justify-between gap-2 h-12">
      <Link to="/" className="[&.active]:font-bold">
        <TractianLogo title="Tractian Logo"  className="h-8" />
      </Link>
      <div role='group' className='flex gap-2'>
        <CompaniesLinks />
      </div>
    </header>
  )
}
