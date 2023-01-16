import { useRouter } from 'next/router'
import { useState } from 'react'
import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY_PUBLIC } from '../api'
import { useDebounce } from '../hooks/useDebounce'
import { SearchResult } from '../types'
import { SearchBarIcon } from './SearchBarIcon'
import { SearchBarResult } from './SearchBarResult'

export function SearchBar() {
  const [search, setSearch] = useState('')
  const [filteredList, setFilteredList] = useState<SearchResult[]>([])

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
    500
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
          className='rounded caret-purple-500 px-3 bg-neutral-900 border-neutral-300 w-full border-2 py-1 placeholder-neutral-400'
          type='text'
          name='search'
          placeholder='Search by keyword...'
          value={search || ''}
          autoComplete='off'
          onChange={handleSearchChange}
          spellCheck={false}
        />
        <SearchBarResult list={filteredList} search={search} />
        <button
          className='absolute right-2 top-0 bottom-0'
          type='submit'
          aria-label='Search'
        >
          <SearchBarIcon />
        </button>
      </label>
    </form>
  )
}
