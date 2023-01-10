import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'
import { MovieListResult } from '../types'

interface Props {
  movie: MovieListResult
}

export const ListSliderItem = ({ movie }: Props) => {
  return (
    <li className='hover:brightness-125 transition'>
      <Link className='h-full block' href={`/movie/${movie.id}`}>
        {movie.poster_path ? (
          <div className='md:w-36 sm:w-32 w-28 h-full'>
            <Image
              className='rounded-lg h-full object-cover border border-neutral-700'
              src={`${API_IMG_URL}${POSTER_SIZES.md}${movie.poster_path}`}
              alt={movie.title}
              width={160}
              height={240}
            />
          </div>
        ) : (
          <p className='line-clamp-3 md:w-36 sm:w-32 w-28 text-center max-w-full text-xs md:text-sm break-all md:m-2'>
            {movie.title}
          </p>
        )}
      </Link>
    </li>
  )
}
