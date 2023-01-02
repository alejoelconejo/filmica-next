import Link from 'next/link'
import { useState } from 'react'
import { HamburgerButton } from './HamburguerButton'
import LoginButton from './LoginButton'
import { SearchBar } from './SearchBar'

export const Header = () => {
  const [isMenuOpen, toggleMenu] = useState(false)

  function handleMenuToggle() {
    toggleMenu((prevState) => !prevState)
  }

  return (
    <header className='max-w-5xl mx-auto py-4 mb-4 px-2 md:px-0 gap-4'>
      <div className='flex justify-between items-center mb-4'>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-orange-500 hover:text-white transition-colors'>
            filmica.
          </h1>
        </Link>
        <nav className='items-center hidden md:flex'>
          <ul className='flex gap-4 items-center'>
            <li>
              <Link href='/' className='text-lg font-semibold'>
                <h2>Home</h2>
              </Link>
            </li>
            <li>
              <Link href='/favorites' className='text-lg font-semibold'>
                <h2>Favorites</h2>
              </Link>
            </li>
          </ul>
        </nav>
        <div className='hidden md:block'>
          <LoginButton />
        </div>
        <div className='block md:hidden'>
          <HamburgerButton
            isMenuOpen={isMenuOpen}
            toggleMenu={handleMenuToggle}
          />
        </div>
      </div>
      <div className='hidden md:block'>
        <SearchBar />
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full pb-4`}>
        <nav className='items-center flex flex-col'>
          <SearchBar />
          <ul className='flex gap-4 items-center flex-col justify-center flex-1 mt-4'>
            <li>
              <Link href='/' className='text-lg font-semibold'>
                <h2>Home</h2>
              </Link>
            </li>
            <li>
              <Link href='/favorites' className='text-lg font-semibold'>
                <h2>Favorites</h2>
              </Link>
            </li>
            <LoginButton />
          </ul>
        </nav>
      </div>
    </header>
  )
}
