import Link from 'next/link'
import { SearchBar } from './SearchBar'

export const Header = () => {
  return (
    <header className='max-w-5xl mx-auto py-4 mb-4 px-2 md:px-0 gap-4'>
      <div className='flex justify-between items-center mb-4'>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-orange-500 hover:text-white transition-colors'>
            filmica.
          </h1>
        </Link>
        <nav className='flex items-center'>
          <ul className='flex gap-4 items-center'>
            <li>
              <Link href='/' className='text-lg font-semibold'>
                <h3>Home</h3>
              </Link>
            </li>
            <li>
              <Link href='/popular' className='text-lg font-semibold'>
                <h3>Popular</h3>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <SearchBar />
    </header>
  )
}
