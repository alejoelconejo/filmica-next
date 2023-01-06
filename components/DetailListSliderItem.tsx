import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'
import { MovieListResult } from '../types'

interface Props {
  movie: MovieListResult
}

export const DetailListSliderItem = ({ movie }: Props) => {
  return (
    <li className='min-w-0 flex-shrink-0 flex-grow-0 basis-1/4 sm:basis-1/6 md:basis-1/12'>
      <Link href={`/movie/${movie.id}`}>
        {movie.poster_path ? (
          <Image
            className='rounded-lg h-full object-cover'
            src={`${API_IMG_URL}${POSTER_SIZES.sm}${movie.poster_path}`}
            alt={movie.title}
            width={80}
            height={120}
          />
        ) : (
          <p className='line-clamp-3 text-center max-w-full text-xs md:text-sm break-word md:m-2'>
            {movie.title}
          </p>
        )}
      </Link>
    </li>
  )
}
