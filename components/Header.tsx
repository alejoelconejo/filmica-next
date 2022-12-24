import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header = () => {
  const history = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const keywords = e.currentTarget.search.value.trim()
    if (keywords.length === 0) {
      alert('You must enter at least a keyword')
    } else if (keywords.length < 4) {
      alert('You must enter more than 3 letters')
    } else {
      e.currentTarget.search.value = ''
      history.push(`/results?kwd=${encodeURIComponent(keywords)}`)
    }
  }

  return (
    <header className='max-w-5xl mx-auto py-4 flex justify-between'>
      <div>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-orange-500 hover:text-white transition-colors'>
            filmica.
          </h1>
        </Link>
      </div>
      <form className='flex gap-3' onSubmit={handleSearch}>
        <label>
          <input
            className='rounded px-3 bg-neutral-900 border-neutral-300 border-2 py-1 placeholder-neutral-400'
            type='text'
            name='search'
            placeholder='Search by keyword...'
          />
        </label>
        <button type='submit'>
          {/* <SearchBarIcon className='h-5 w-5 fill-white' /> */}
          🔍
        </button>
      </form>
      <nav className='flex items-center'>
        <ul className='flex gap-4 items-center'>
          <li>
            <Link href='/' className='text-lg font-semibold'>
              <h3>Home</h3>
            </Link>
          </li>
          <li>
            <Link href='/discover' className='text-lg font-semibold'>
              <h3>Discover</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
