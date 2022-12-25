import Image from 'next/image'
import Link from 'next/link'
import { API_BASE_URL, API_IMG_URL, API_KEY } from '../api'

const endPointPopular = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=1`
const endPointTrending = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES&page=1`
const endPointUpcoming = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`

export async function getStaticProps() {
  const resPopular = await fetch(endPointPopular)
  const dataPopular = await resPopular.json()
  const moviesPopular = dataPopular.results.slice(0, 10)

  const resTrending = await fetch(endPointTrending)
  const dataTrending = await resTrending.json()
  const moviesTrending = dataTrending.results.slice(0, 10)

  const resUpcoming = await fetch(endPointUpcoming)
  const dataUpcoming = await resUpcoming.json()
  const moviesUpcoming = dataUpcoming.results.slice(0, 10)

  return {
    props: {
      moviesPopular,
      moviesTrending,
      moviesUpcoming,
    },
  }
}

export default function Home({
  moviesPopular,
  moviesTrending,
  moviesUpcoming,
}: any) {
  return (
    <>
      <h2 className='text-5xl font-bold text-center mb-8'>Filmica</h2>
      <section className='mb-8'>
        <div className='flex justify-between mb-4 items-center'>
          <h3 className='text-3xl font-semibold'>Popular films</h3>
          <Link href='/popular'>See all →</Link>
        </div>
        <ul className='grid grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))] gap-4'>
          {moviesPopular.map((movie: any) => (
            <li key={movie.id}>
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
        </ul>
      </section>
      <section className='mb-8'>
        <div className='flex justify-between mb-4 items-center'>
          <h3 className='text-3xl font-semibold'>Upcoming films</h3>
          <Link href='/upcoming'>See all →</Link>
        </div>
        <ul className='grid grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))] gap-4'>
          {moviesUpcoming.map((movie: any) => (
            <li key={movie.id}>
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
        </ul>
      </section>
      <section className='mb-8'>
        <div className='flex justify-between mb-4 items-center'>
          <h3 className='text-3xl font-semibold'>Trending films</h3>
          <Link href='/trending'>See all →</Link>
        </div>
        <ul className='grid grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))] gap-4'>
          {moviesTrending.map((movie: any) => (
            <li key={movie.id}>
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
        </ul>
      </section>
    </>
  )
}
