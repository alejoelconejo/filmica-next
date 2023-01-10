import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES, PROFILE_SIZES } from '../api'
import { SearchResult } from '../types'
import getYearFromString from '../utils/getYearFromString'
import roundNumOneDecimal from '../utils/roundNumOneDecimal'

interface Props {
  result: SearchResult
}

export const SearchResultsItem = ({ result }: Props) => {
  if (!result) return null

  if (result.media_type === 'person') {
    return (
      <li className='bg-neutral-900 text-neutral-50 rounded border border-neutral-700 transition hover:brightness-125 hover:bg-purple-500/30'>
        <Link className='flex' href={`/person/${result.id}`}>
          <div className='relative h-24 w-16 shrink-0'>
            {result.profile_path ? (
              <Image
                className='rounded-l'
                src={`${API_IMG_URL}${PROFILE_SIZES.md}${result.profile_path}`}
                alt={result.name as string}
                height={96}
                width={64}
                title={result.name}
              />
            ) : (
              <div className='h-24 w-16 flex items-center justify-center px-1 bg-neutral-600'>
                <p className='line-clamp-3 text-center max-w-full text-xs break-all'>
                  {result.name}
                </p>
              </div>
            )}
            <span className='bg-blue-400 text-neutral-50 text-xs p-1 absolute -bottom-1 -right-1 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#fff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M0 0h24v24H0z' stroke='none' />
                <circle cx='12' cy='7' r='4' />
                <path d='M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2' />
              </svg>
            </span>
          </div>
          <div className='flex flex-col justify-between p-2'>
            <div>
              <span className='text-lg font-semibold line-clamp-1'>
                {result.name}
              </span>
            </div>
            <p className='text-sm text-neutral-400'>
              <span className='mr-[0.15rem] text-yellow-400'>★</span>
              {roundNumOneDecimal(result.popularity)}
            </p>
          </div>
        </Link>
      </li>
    )
  }

  if (result.media_type === 'tv') {
    return (
      <li className='bg-neutral-900 text-neutral-50 rounded border border-neutral-700 transition hover:brightness-125 hover:bg-purple-500/30'>
        <Link className='flex' href={`/tv/${result.id}`}>
          <div className='relative w-16 flex-shrink-0'>
            {result.poster_path ? (
              <Image
                className='w-full rounded-l '
                src={`${API_IMG_URL}${POSTER_SIZES.xs}${result.poster_path}`}
                alt={result.original_name as string}
                height={96}
                width={64}
                title={result.original_name}
              />
            ) : (
              <div className='h-24 w-16 flex items-center justify-center px-1 bg-neutral-600'>
                <p className='line-clamp-3 text-center max-w-full text-xs break-all'>
                  {result.original_name}
                </p>
              </div>
            )}
            <span className='bg-pink-400 text-neutral-50 text-xs p-1 absolute -bottom-1 -right-1 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#fff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M0 0h24v24H0z' stroke='none' />
                <rect x='3' y='7' width='18' height='13' rx='2' />
                <path d='m16 3-4 4-4-4' />
              </svg>
            </span>
          </div>
          <div className='flex flex-col justify-between p-2'>
            <div>
              <span className='text-lg font-semibold line-clamp-1'>
                {result.original_name}
              </span>
              <span className='text-sm text-neutral-400'>
                {getYearFromString(result.first_air_date as string)}
              </span>
            </div>
            {result.vote_count ? (
              <p className='text-sm text-neutral-400'>
                <span className='mr-[0.15rem] text-yellow-400'>★</span>
                {roundNumOneDecimal(result.vote_average as number)}
                <span className='text-xs ml-1'>({result.vote_count})</span>
              </p>
            ) : (
              ''
            )}
          </div>
        </Link>
      </li>
    )
  }
  // for 'movie' type
  return (
    <li className='bg-neutral-900 text-neutral-50 rounded border border-neutral-700 transition hover:brightness-125 hover:bg-purple-500/30'>
      <Link className='flex' href={`/movie/${result.id}`}>
        <div className='w-16 relative shrink-0'>
          {result.poster_path ? (
            <Image
              className='w-full rounded-l'
              src={`${API_IMG_URL}${POSTER_SIZES.xs}${result.poster_path}`}
              alt={result.original_title as string}
              height={96}
              width={64}
              title={result.original_title}
            />
          ) : (
            <div className='h-24 w-16 flex items-center justify-center px-1 bg-neutral-600'>
              <p className='line-clamp-3 text-center max-w-full text-xs break-all'>
                {result.title}
              </p>
            </div>
          )}
          <span className='bg-green-400 text-neutral-50 text-xs p-1 absolute -bottom-1 -right-1 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#fff'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M0 0h24v24H0z' stroke='none' />
              <rect x='4' y='4' width='16' height='16' rx='2' />
              <path d='M8 4v16M16 4v16M4 8h4M4 16h4M4 12h16M16 8h4M16 16h4' />
            </svg>
          </span>
        </div>
        <div className='flex flex-col justify-between p-2'>
          <div>
            <span className='text-lg font-semibold line-clamp-1'>
              {result.original_title}
            </span>
            <span className='text-sm text-neutral-400'>
              {getYearFromString(result.release_date as string)}
            </span>
          </div>
          {result.vote_count ? (
            <p className='text-sm text-neutral-400'>
              <span className='mr-[0.15rem] text-yellow-400'>★</span>
              {roundNumOneDecimal(result.vote_average as number)}
              <span className='text-xs ml-1'>({result.vote_count})</span>
            </p>
          ) : (
            ''
          )}
        </div>
      </Link>
    </li>
  )
}
