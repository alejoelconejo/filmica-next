import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { Container } from './Container'
import LoginMenu from './LoginMenu'
import { SearchBar } from './SearchBar'
import { SearchBarIcon } from './SearchBarIcon'

export const Header = () => {
  return (
    <header className='px-2 py-1 sm:py-4 md:px-0 bg-gradient-to-b from-black to to-black/50 sticky top-0 left-0 right-0 z-50 backdrop-blur shadow-sm shadow-white/10'>
      <Container>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <h1 className='bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text text-4xl font-bold hover:brightness-125 transition'>
              filmica.
            </h1>
          </Link>
          <div className='hidden md:block w-1/2'>
            <SearchBar />
          </div>
          <div className='flex gap-8 items-center'>
            <div className='block md:hidden'>
              <Menu as='div' className=''>
                <Menu.Button className='flex items-center' aria-label='Search'>
                  <SearchBarIcon />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 left-0 mt-3 px-2 w-full'>
                    <Menu.Item>
                      <SearchBar />
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <LoginMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}
