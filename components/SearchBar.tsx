import { useRouter } from 'next/router'

export const SearchBar = () => {
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
    <form className='gap-1 flex items-center w-full' onSubmit={handleSearch}>
      <label className='flex-1'>
        <input
          className='rounded px-3 bg-neutral-900 border-neutral-300 w-full border-2 py-1 placeholder-neutral-400'
          type='text'
          name='search'
          placeholder='Search by keyword...'
        />
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
