import Image from 'next/image'
import { API_BASE_URL, API_IMG_URL, API_KEY } from '../../api'

const endPointPath = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=1`
// TODO: Fetch recommended movies and render them
// const recommendedEndPoint = `${API_BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=es-ES`

export async function getStaticPaths() {
  const res = await fetch(endPointPath) // TODO: investigar si hay otra forma de generar el listado de los ids
  const data = await res.json()
  const movies = data.results

  const paths = movies.map((movie: any) => {
    return {
      params: {
        id: encodeURIComponent(movie.id),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const endPoint = `${API_BASE_URL}/movie/${params.id}?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(endPoint)
  const movie = await res.json()

  return {
    props: {
      movie,
    },
  }
}

const MovieDetail = ({ movie }: any) => {
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

      {/* <section>
    <ul className='flex flex-wrap gap-4'>
      {recommendedMovies?.slice(10).map((movie) => (
        <li className='w-24' key={movie.id}>
          <Link
            to={`/detail/${movie.id}`}
            className='hover:opacity-80 transition-opacity duration-75'
          >
            <img
              src={`${API_IMG_URL}${movie.poster_path}`}
              className='h-32 object-contain mb-4'
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  </section> */}
    </div>
  )
}

export default MovieDetail
