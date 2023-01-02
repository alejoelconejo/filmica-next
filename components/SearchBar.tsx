import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY_PUBLIC } from '../api'
import { SearchResultsItem } from './SearchResultsItem'

function useDebounce(
  effect: () => void,
  dependencies: string[],
  delay: number
) {
  const callback = useCallback(effect, [dependencies, effect])

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

const SEARCH_LIST_LENGTH = 6

export const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [filteredList, setFilteredList] = useState([])

  const endPoint = `${API_BASE_URL}/search/multi?api_key=${API_KEY_PUBLIC}&language=${API_DEFAULT_LANGUAGE}&query=${search}&page=1`

  useDebounce(
    () => {
      search
        ? fetch(endPoint)
            .then((res) => res.json())
            .then((data) => setFilteredList(data.results))
        : setFilteredList([])
    },
    [search],
    1000
  )

  const router = useRouter()

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const keywords = e.currentTarget.search.value.trim()
    if (keywords.length === 0) {
      alert('You must enter at least a keyword')
    } else if (keywords.length < 4) {
      alert('You must enter more than 3 letters')
    } else {
      e.currentTarget.search.value = ''
      router.push(`/results?kwd=${encodeURIComponent(keywords)}`)
    }
  }

  return (
    <form
      className='gap-1 flex items-center w-full'
      onSubmit={handleSearchSubmit}
    >
      <label className='group flex-1 relative'>
        <input
          className='rounded px-3 bg-neutral-900 border-neutral-300 w-full border-2 py-1 placeholder-neutral-400'
          type='text'
          name='search'
          placeholder='Search by keyword...'
          value={search || ''}
          autoComplete='off'
          onChange={handleSearchChange}
        />

        <div
          className={`w-96 max-w-full absolute group-focus-within:block hidden bg-white text-black p-4 z-50`}
        >
          {filteredList.length ? (
            <>
              <ul className='flex flex-col gap-2 mb-4'>
                {filteredList.slice(0, SEARCH_LIST_LENGTH).map((item: any) => (
                  <SearchResultsItem key={item.id} result={item} />
                ))}
              </ul>
              <Link href={`/results?kwd=${encodeURIComponent(search)}`}>
                See all results
              </Link>
            </>
          ) : (
            <p className='text-gray-500'>
              Search your favorite movie, person or TV show
            </p>
          )}
        </div>
      </label>
      <button type='submit'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='25'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <circle cx='10' cy='10' r='7' />
          <line x1='21' y1='21' x2='15' y2='15' />
        </svg>
      </button>
    </form>
  )
}
