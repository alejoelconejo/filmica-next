import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'
import { MovieListResult } from '../types'

interface Props {
  movie: MovieListResult
}

export const DetailListSliderItem = ({ movie }: Props) => {
  return (
    <li className='hover:brightness-110 transition'>
      <Link href={`/movie/${movie.id}`}>
        {movie.poster_path ? (
          <div className='aspect-[154/231] w-24'>
            <Image
              className='rounded-lg h-full object-cover border border-neutral-700'
              src={`${API_IMG_URL}${POSTER_SIZES.sm}${movie.poster_path}`}
              alt={movie.title}
              width={154}
              height={231}
              title={movie.title}
            />
          </div>
        ) : (
          <div className='aspect-[154/231] w-24 flex items-center justify-center border rounded-lg border-neutral-700'>
            <p className='line-clamp-3 text-center max-w-full text-xs break-all'>
              {movie.title}
            </p>
          </div>
        )}
      </Link>
    </li>
  )
}
