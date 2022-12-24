import Image from 'next/image'
import Link from 'next/link'
import { API_BASE_URL, API_IMG_URL, API_KEY } from '../../api'

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(endPoint)
  const movie = await res.json()

  const recommendedEndPoint = `${API_BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=es-ES`

  const recommendedRes = await fetch(recommendedEndPoint)
  const dataMovies = await recommendedRes.json()
  const recommendedMovies = await dataMovies.results

  return {
    props: {
      movie,
      recommendedMovies,
    },
  }
}

const MovieDetail = ({ movie, recommendedMovies }: any) => {
  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${movie?.poster_path}`}
          className='h-96 object-contain'
          alt={movie?.title}
          height={384}
          width={256}
        />
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl'>{movie?.title}</h2>
          <p>{movie?.overview}</p>
          <ul>
            {movie?.genres.map((genre: any) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <section>
        <ul className='flex flex-wrap gap-4'>
          {recommendedMovies?.slice(10).map((movie: any) => (
            <li className='w-24' key={movie.id}>
              <Link
                href={`/movie/${movie.id}`}
                className='hover:opacity-80 transition-opacity duration-100'
              >
                <Image
                  src={`${API_IMG_URL}${movie.poster_path}`}
                  className='mb-4'
                  alt={movie.title}
                  height={192}
                  width={128}
                />
                <h3>{movie.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default MovieDetail
