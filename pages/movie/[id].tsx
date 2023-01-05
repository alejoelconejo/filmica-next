import Image from 'next/image'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
  POSTER_SIZES,
} from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'
import { Cast, Crew, MovieDetail, MovieListResult } from '../../types'
import Link from 'next/link'
import getYearFromString from '../../utils/getYearFromString'
import roundNumOneDecimal from '../../utils/roundNumOneDecimal'

interface Props {
  movie: MovieDetail
  recommendedMovies: MovieListResult[]
  crew: Crew[]
  cast: Cast[]
  directors: Crew[]
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const res = await fetch(endPoint)
  const movie: MovieDetail = await res.json()

  const recommendedEndPoint = `${API_BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const recommendedRes = await fetch(recommendedEndPoint)
  const dataMovies = await recommendedRes.json()
  const recommendedMovies: MovieListResult[] = await dataMovies.results

  const creditsEndPoint = `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const creditsRes = await fetch(creditsEndPoint)
  const dataCredits = await creditsRes.json()
  const crew: Crew[] = await dataCredits.crew
  const cast: Cast[] = await dataCredits.cast

  const directors = crew.filter((person) => person.job === 'Director')

  return {
    props: {
      movie,
      recommendedMovies,
      crew,
      cast,
      directors,
    },
  }
}

const MovieDetail = ({
  movie,
  recommendedMovies,
  crew,
  cast,
  directors,
}: Props) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, title: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${POSTER_SIZES.lg}${movie.poster_path}`}
          className='object-contain object-top'
          alt={movie.title}
          height={384}
          width={256}
        />
        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between items-start'>
            <h2 className='text-4xl font-semibold'>{movie?.title}</h2>
            <button
              className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                isFavorite(movie.id) ? 'text-red-500' : 'text-transparent'
              }`}
              onClick={() =>
                toggleFavorites(movie.id, movie.title, movie.poster_path)
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='26'
                viewBox='0 0 24 24'
                strokeWidth='1.8'
                stroke='#ff2825'
                fill='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
              </svg>
            </button>
          </div>
          <section>
            {directors.map((director) => (
              <h3 key={director.id}>{director.name}</h3>
            ))}
          </section>
          <section className='text-sm text-neutral-300 flex gap-1 mb-1'>
            <span>{getYearFromString(movie.release_date)}</span>
            <span className='text-neutral-400'>•</span>
            <span>{movie.runtime} min.</span>
            <span className='text-neutral-400'>•</span>
            <p className='flex gap-2'>
              {movie.production_countries.map((country) => (
                <span className='border-neutral-300' key={country.iso_3166_1}>
                  {country.name}
                </span>
              ))}
            </p>
          </section>
          <p className='text-sm text-neutral-300 mb-4'>
            <span className='mr-[0.15rem] text-yellow-400'>★</span>
            {roundNumOneDecimal(movie.vote_average)}{' '}
            <span className='text-xs'>({movie.vote_count})</span>
          </p>
          <p className='mb-8'>{movie.overview}</p>
          <ul className='flex gap-2 text-sm mb-4'>
            {movie.genres.map((genre) => (
              <li
                key={genre.id}
                className='border px-2 py-1 border-neutral-200 rounded-lg'
              >
                {genre.name}
              </li>
            ))}
          </ul>
          {/* <section className='mb-2'>
            <h4>Crew</h4>
            <ul className='flex text-sm flex-wrap gap-2'>
              {crew.map((person) => (
                <li key={person.id}>{person.name}</li>
              ))}
            </ul>
          </section>
          <section className='mb-2'>
            <h4>Cast</h4>
            <ul className='flex text-sm flex-wrap gap-2'>
              {cast.map((person) => (
                <li key={person.id}>{person.name}</li>
              ))}
            </ul>
          </section> */}
        </div>
      </div>
      {recommendedMovies.length ? (
        <section>
          <h3 className='text-2xl mb-4'>Recommended Movies</h3>
          <ul className='flex flex-wrap gap-4'>
            {recommendedMovies.map((movie) => (
              <li className='w-24' key={movie.id}>
                <Link
                  href={`/movie/${movie.id}`}
                  className='hover:opacity-80 transition-opacity duration-100'
                >
                  <Image
                    src={`${API_IMG_URL}${POSTER_SIZES.sm}${movie.poster_path}`}
                    className='mb-4'
                    alt={movie.title}
                    height={144}
                    width={96}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        ''
      )}
    </div>
  )
}

export default MovieDetail
