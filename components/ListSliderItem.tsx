import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL } from '../api'
import { MovieListResult } from '../types'

interface Props {
  movie: MovieListResult
}

export const ListSliderItem = ({ movie }: Props) => {
  return (
    <li className='min-w-0 flex-shrink-0 flex-grow-0 basis-1/4 md:basis-1/5'>
      <Link href={`/movie/${movie.id}`}>
        <Image
          className='rounded-lg mb-2'
          src={`${API_IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          width={192}
          height={288}
        />
      </Link>
    </li>
  )
}
