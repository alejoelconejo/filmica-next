import Link from 'next/link'
import { Crew, MovieDetail } from '../types'
import getYearFromString from '../utils/getYearFromString'
import roundNumOneDecimal from '../utils/roundNumOneDecimal'

interface Props {
  directors: Crew[]
  movie: MovieDetail
}

export function DetailMovieData({ directors, movie }: Props) {
  return (
    <section>
      <section>
        {directors.map((director) => (
          <Link href={`/person/${director.id}`} key={director.id}>
            {director.name}
          </Link>
        ))}
      </section>
      <section className='text-sm text-neutral-300 flex gap-1 mb-1'>
        {movie.release_date ? (
          <span>
            {getYearFromString(movie.release_date)}
            <span className='text-neutral-400 ml-1'>•</span>
          </span>
        ) : (
          ''
        )}
        {movie.runtime ? (
          <span>
            {movie.runtime} min.
            <span className='text-neutral-400 ml-1'>•</span>
          </span>
        ) : (
          ''
        )}
        <p className='flex gap-2'>
          {movie.production_countries.map((country) => (
            <span className='border-neutral-300' key={country.iso_3166_1}>
              {country.name}
            </span>
          ))}
        </p>
      </section>
      {movie.vote_count ? (
        <p className='text-sm text-neutral-300 mb-4'>
          <span className='mr-[0.15rem] text-yellow-400'>★</span>
          {roundNumOneDecimal(movie.vote_average)}
          <span className='text-xs ml-1'>({movie.vote_count})</span>
        </p>
      ) : (
        ''
      )}
    </section>
  )
}
