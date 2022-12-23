import Link from 'next/link'

export const Header = () => {
  return (
    <header className='max-w-5xl mx-auto py-4 flex justify-between'>
      <div>
        <h1 className='text-5xl font-bold'>Filmica</h1>
        <p className='text-orange-500 text-3xl font-semibold'>
          Discover your favourite films
        </p>
      </div>
      <nav className='flex items-center'>
        <ul className='flex gap-4 items-center'>
          <li>
            <Link href='/' className='text-xl font-semibold'>
              <h3>Home</h3>
            </Link>
          </li>
          <li>
            <Link href='/discover' className='text-xl font-semibold'>
              <h3>Discover</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
