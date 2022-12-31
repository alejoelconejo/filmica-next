import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='flex gap-4'>
        <button onClick={() => signOut()}>Sign Out</button>
        {session.user?.image && (
          <Image
            className='rounded-full border border-gray-400'
            width={36}
            height={36}
            alt={session.user.name || 'User'}
            src={session.user.image!}
            referrerPolicy='no-referrer'
          />
        )}
      </div>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  )
}
