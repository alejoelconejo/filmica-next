import Link from 'next/link'
import { SearchResult } from '../types'
import { SearchResultsItem } from './SearchResultsItem'

interface Props {
  list: SearchResult[]
  search: string
}

const SEARCH_LIST_LENGTH = 6

export function SearchBarResult({ list, search }: Props) {
  return (
    <div
      className={`w-full overflow-y-auto max-h-[80vh] max-w-full absolute group-focus-within:block hidden bg-neutral-800 border-2 border-neutral-900 rounded-b text-black p-4 z-50`}
    >
      {list.length ? (
        <>
          <ul className='flex flex-col gap-2 mb-4'>
            {list.slice(0, SEARCH_LIST_LENGTH).map((item) => (
              <SearchResultsItem key={item.id} result={item} />
            ))}
          </ul>
          <Link
            className='w-fit ml-auto block border border-neutral-400 bg-neutral-900 hover:brightness-125 transition text-sm rounded text-neutral-100 px-2 py-1 hover:'
            href={`/results?kwd=${encodeURIComponent(search)}`}
          >
            See all results
          </Link>
        </>
      ) : (
        <p className='text-neutral-300'>Search any movie, person or TV show</p>
      )}
    </div>
  )
}
