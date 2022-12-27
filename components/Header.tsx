import Link from 'next/link'
import { SearchBar } from './SearchBar'

export const Header = () => {
  return (
    <header className='max-w-5xl mx-auto py-4 flex flex-wrap justify-between mb-4 px-2 md:px-0 gap-4'>
      <div className='order-1'>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-orange-500 hover:text-white transition-colors'>
            filmica.
          </h1>
        </Link>
      </div>
      <SearchBar />
      <nav className='flex items-center order-2 md:order-3'>
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
    </header>
  )
}
