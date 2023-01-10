import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, BACKDROP_SIZES } from '../api'
import { MovieListResult } from '../types'
import getYearFromString from '../utils/getYearFromString'
import roundNumOneDecimal from '../utils/roundNumOneDecimal'

interface Props {
  movies: MovieListResult[]
}

export function HomeLatestMovie({ movies }: Props) {
  const firstMovie = movies[0]
  const movieList = movies.slice(1, 6)

  return (
    <div className='flex gap-12 sm:gap-8 md:flex-row flex-col'>
      <div>
        <Link href={`/movie/${firstMovie.id}`}>
          <div className='relative group rounded-sm sm:h-full min-h-[300px]'>
            <div className='overflow-hidden'>
              <Image
                src={`${API_IMG_URL}${BACKDROP_SIZES.md}${firstMovie.backdrop_path}`}
                alt={firstMovie.title}
                height={439}
                width={780}
                className='group-hover:brightness-110 group-hover:scale-105 transition duration-200 h-[300px] sm:h-full object-cover'
              />
            </div>
            <div className='absolute left-1 -bottom-4 bg-black p-2 rounded w-2/5 [box-shadow:_rgba(0,_0,_0,_0.24)_3px_3px_8px;] border border-neutral-500/30'>
              <h3 className='font-bold text-xl line-clamp-2'>
                {firstMovie.original_title}
              </h3>
              <span className='font-semibold text-sm'>
                {getYearFromString(firstMovie.release_date)}
              </span>
              <p className='text-sm text-neutral-300 mt-2'>
                <span className='mr-[0.15rem] text-yellow-400'>★</span>
                {roundNumOneDecimal(firstMovie.vote_average)}
                <span className='text-xs ml-1'>({firstMovie.vote_count})</span>
              </p>
            </div>
            <div className='bg-green-500/50 rounded-full aspect-square w-16 absolute right-2 top-2 flex items-center justify-center border border-neutral-900/30'>
              <span className='text-4xl font-bold'>1</span>
            </div>
          </div>
        </Link>
      </div>
      <div className='mx-auto'>
        <Link href='/trending'>
          <h2 className='font-semibold text-2xl text-center uppercase hover:text-neutral-200 mb-4 hover:underline hover:decoration-green-500/50 hover:decoration-2'>
            Trending movies
          </h2>
        </Link>
        <ul className='divide-y-2 divide-neutral-400'>
          {movieList.map((movie, index) => (
            <li key={movie.id} className='flex gap-2 py-2 group'>
              <div className='text-xl font-semibold underline decoration-green-500/50 decoration-2'>
                {index + 2}
              </div>
              <Link href={`/movie/${movie.id}`}>
                <div>
                  <span className='line-clamp-1 group-hover:text-orange-400 hover:brightness-125 group-hover:brightness-125 font-semibold'>
                    {movie.original_title}
                  </span>
                  <p className='text-sm text-neutral-300'>
                    <span className='mr-[0.15rem] text-yellow-400'>★</span>
                    {roundNumOneDecimal(movie.vote_average)}
                    <span className='text-xs ml-1'>({movie.vote_count})</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
