import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'
import { TvShowsListResult } from '../types'

interface Props {
  tvShow: TvShowsListResult
}

export const DetailTVListSliderItem = ({ tvShow }: Props) => {
  return (
    <li className='hover:brightness-110 transition'>
      <Link href={`/tv/${tvShow.id}`}>
        {tvShow.poster_path ? (
          <div className='aspect-[154/231] w-24'>
            <Image
              className='rounded-lg h-full object-cover border border-neutral-700'
              src={`${API_IMG_URL}${POSTER_SIZES.sm}${tvShow.poster_path}`}
              alt={tvShow.name}
              width={154}
              height={231}
              title={tvShow.name}
            />
          </div>
        ) : (
          <div className='aspect-[154/231] w-24 flex items-center justify-center border rounded-lg border-neutral-700'>
            <p className='line-clamp-3 text-center max-w-full text-xs break-all'>
              {tvShow.name}
            </p>
          </div>
        )}
      </Link>
    </li>
  )
}
