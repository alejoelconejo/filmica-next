import Image from 'next/image'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
  POSTER_SIZES,
} from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'
import { MovieDetail, MovieListResult } from '../../types'
import Link from 'next/link'

interface Props {
  movie: MovieDetail
  recommendedMovies: MovieListResult[]
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

  return {
    props: {
      movie,
      recommendedMovies,
    },
  }
}

const MovieDetail = ({ movie, recommendedMovies }: Props) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, title: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${POSTER_SIZES.lg}${movie.poster_path}`}
          className='object-contain'
          alt={movie?.title}
          height={384}
          width={256}
        />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-3xl'>{movie?.title}</h2>
            <button
              className='text-2xl text-yellow-400'
              onClick={() =>
                toggleFavorites(movie.id, movie.title, movie.poster_path)
              }
            >
              {isFavorite(movie.id) ? '★' : '☆'}
            </button>
          </div>
          <p>{movie?.overview}</p>
          <ul>
            {movie?.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
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
