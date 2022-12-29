import Image from 'next/image'
import Link from 'next/link'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
  getMovies,
} from '../api'
import { ListSlider } from '../components/ListSlider'
import { MovieListResult } from '../types'

const endPointPopular = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointTrending = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointUpcoming = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`

export async function getStaticProps() {
  const moviesPopular = await getMovies(endPointPopular)
  const moviesTrending = await getMovies(endPointTrending)
  const moviesUpcoming = await getMovies(endPointUpcoming)

  return {
    props: {
      moviesPopular,
      moviesTrending,
      moviesUpcoming,
    },
  }
}

interface Props {
  moviesPopular: MovieListResult[]
  moviesTrending: MovieListResult[]
  moviesUpcoming: MovieListResult[]
}

export default function Home({
  moviesPopular,
  moviesTrending,
  moviesUpcoming,
}: Props) {
  return (
    <>
      <h2 className='text-5xl font-bold text-center mb-8'>Filmica</h2>
      <section className='mb-8'>
        <div className='flex justify-between mb-4 items-center'>
          <h3 className='text-3xl font-semibold'>Popular films</h3>
          <Link href='/popular'>See all →</Link>
        </div>
        <ListSlider>
          {moviesPopular.map((movie) => (
            <li key={movie.id} className='keen-slider__slide'>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  className='rounded-lg mb-2'
                  src={`${API_IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={384}
                  height={576}
                />
              </Link>
            </li>
          ))}
        </ListSlider>
      </section>
      <section className='mb-8'>
        <div className='flex justify-between mb-4 items-center'>
          <h3 className='text-3xl font-semibold'>Upcoming films</h3>
          <Link href='/upcoming'>See all →</Link>
        </div>
        <ListSlider>
          {moviesUpcoming.map((movie) => (
            <li key={movie.id} className='keen-slider__slide'>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  className='rounded-t-lg mb-2'
                  src={`${API_IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={384}
                  height={576}
                />
              </Link>
            </li>
          ))}
        </ListSlider>
      </section>
      <section className='mb-8'>
        <div className='flex justify-between mb-4 items-center'>
          <h3 className='text-3xl font-semibold'>Trending films</h3>
          <Link href='/trending'>See all →</Link>
        </div>
        <ListSlider>
          {moviesTrending.map((movie) => (
            <li key={movie.id} className='keen-slider__slide'>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  className='rounded-t-lg mb-2'
                  src={`${API_IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={384}
                  height={576}
                />
              </Link>
            </li>
          ))}
        </ListSlider>
      </section>
    </>
  )
}
