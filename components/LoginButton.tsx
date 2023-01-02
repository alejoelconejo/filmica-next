import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='flex gap-2'>
        <button onClick={() => signOut()}>Sign Out</button>
        {session.user?.image && (
          <Link href='/profile'>
            <Image
              className='rounded-full border border-gray-400 bg-gray-400'
              width={36}
              height={36}
              alt={session.user.name || 'User'}
              src={session.user.image}
              referrerPolicy='no-referrer'
            />
          </Link>
        )}
      </div>
    )
  }
  return (
    <div className='flex gap-2'>
      <button onClick={() => signIn()}>Sign In</button>
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
    </div>
  )
}
