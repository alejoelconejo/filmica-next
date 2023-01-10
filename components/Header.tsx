import Link from 'next/link'
import { useState } from 'react'
import { Container } from './Container'
import { HamburgerButton } from './HamburguerButton'
import LoginButton from './LoginButton'
import { SearchBar } from './SearchBar'

export const Header = () => {
  const [isMenuOpen, toggleMenu] = useState(false)

  function handleMenuToggle() {
    toggleMenu((prevState) => !prevState)
  }

  return (
    <header className='p-2 md:py-4 md:px-0 bg-gradient-to-b from-black to to-black/50 fixed top-0 left-0 right-0 z-50 backdrop-blur shadow-sm shadow-white/5'>
      <Container>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              {/* <h1 className='text-3xl font-bold text-orange-500 hover:text-white transition-colors'>
                filmica.
              </h1> */}
              <h1 className='bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text text-4xl font-bold hover:brightness-125 transition'>
                filmica.
              </h1>
            </Link>
            <div className='hidden md:block w-1/2'>
              <SearchBar />
            </div>
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
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full pb-4`}>
            <nav className='items-center flex flex-col'>
              <SearchBar />
              <ul className='flex gap-4 items-center flex-col justify-center flex-1 mt-4'>
                <li>
                  <Link href='/favorites' className='text-lg font-semibold'>
                    <h2>Favorites</h2>
                  </Link>
                </li>
                <LoginButton />
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}
