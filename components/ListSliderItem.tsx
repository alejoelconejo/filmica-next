import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'
import { MovieListResult } from '../types'

interface Props {
  movie: MovieListResult
}

export const ListSliderItem = ({ movie }: Props) => {
  return (
    <li className='min-w-0 flex-shrink-0 flex-grow-0 basis-1/4 md:basis-1/6 hover:brightness-125 transition'>
      <Link href={`/movie/${movie.id}`}>
        {movie.poster_path ? (
          <Image
            className='rounded-lg h-full object-cover'
            src={`${API_IMG_URL}${POSTER_SIZES.md}${movie.poster_path}`}
            alt={movie.title}
            width={160}
            height={240}
          />
        ) : (
          <p className='line-clamp-3 text-center max-w-full text-xs md:text-sm break-all md:m-2'>
            {movie.title}
          </p>
        )}
      </Link>
    </li>
  )
}
