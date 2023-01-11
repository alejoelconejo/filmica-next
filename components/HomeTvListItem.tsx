import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'
import { TvShowsListResult } from '../types'
import getYearFromString from '../utils/getYearFromString'
import roundNumOneDecimal from '../utils/roundNumOneDecimal'

interface Props {
  tvShow: TvShowsListResult
}

export function HomeTvListItem({ tvShow }: Props) {
  return (
    <li className='bg-neutral-900 text-neutral-50 rounded border border-neutral-700 transition hover:brightness-125 hover:bg-purple-500/30'>
      <Link className='flex' href={`/tv/${tvShow.id}`}>
        <div className='relative w-16 h-24 flex-shrink-0'>
          {tvShow.poster_path ? (
            <Image
              className='w-full rounded-l h-full'
              src={`${API_IMG_URL}${POSTER_SIZES.xs}${tvShow.poster_path}`}
              alt={tvShow.original_name as string}
              height={96}
              width={64}
              title={tvShow.original_name}
            />
          ) : (
            <div className='h-24 w-16 flex items-center justify-center px-1 bg-neutral-600'>
              <p className='line-clamp-3 text-center max-w-full text-xs break-all'>
                {tvShow.original_name}
              </p>
            </div>
          )}
        </div>
        <div className='flex flex-col justify-between p-2'>
          <div>
            <span className='text-lg font-semibold line-clamp-1'>
              {tvShow.original_name}
            </span>
            <span className='text-sm text-neutral-400'>
              {getYearFromString(tvShow.first_air_date as string)}
            </span>
          </div>
          {tvShow.vote_count ? (
            <p className='text-sm text-neutral-400'>
              <span className='mr-[0.15rem] text-yellow-400'>★</span>
              {roundNumOneDecimal(tvShow.vote_average as number)}
              <span className='text-xs ml-1'>({tvShow.vote_count})</span>
            </p>
          ) : (
            ''
          )}
        </div>
      </Link>
    </li>
  )
}
