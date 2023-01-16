import { Menu, Transition } from '@headlessui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginMenu() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='flex'>
        <Menu as='div' className='relative'>
          <Menu.Button
            className='flex items-center hover:brightness-110 transition'
            aria-label='User'
          >
            <Image
              className='rounded-full border border-gray-400 bg-gray-400'
              width={36}
              height={36}
              alt={session.user.name ?? 'User'}
              src={session.user.image!}
              title={session.user.name!}
              referrerPolicy='no-referrer'
            />
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
            <Menu.Items className='absolute py-2 px-4 bg-neutral-800 border border-neutral-600 rounded-sm w-56 right-0 mt-4 flex flex-col gap-4'>
              <p className='text-center font-bold text-lg border-b border-neutral-500 pb-2'>
                {session.user.name}
              </p>
              <Menu.Item>
                <Link
                  className='hover:text-orange-400 transition'
                  href='/favorites'
                >
                  My Favorites
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='hover:text-orange-400 transition flex'
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    )
  }

  return (
    <div className='flex'>
      <button
        onClick={() => signIn()}
        className='hover:brightness-110 transition'
        aria-label='Sign in'
      >
        <svg
          className='w-9 h-9 text-gray-500'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
            clipRule='evenodd'
          ></path>
        </svg>
      </button>
    </div>
  )
}
