import Image from 'next/image'
import Link from 'next/link'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
} from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`

  const res = await fetch(endPoint)
  const tvShows = await res.json()

  const recommendedEndPoint = `${API_BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`

  const recommendedRes = await fetch(recommendedEndPoint)
  const dataMovies = await recommendedRes.json()
  const recommendedMovies = await dataMovies.results

  return {
    props: {
      tvShows,
      recommendedMovies,
    },
  }
}

const TvDetail = ({ tvShows, recommendedMovies }: any) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, title: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${tvShows?.poster_path}`}
          className='h-96 object-contain'
          alt={tvShows?.name}
          height={384}
          width={256}
        />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-3xl'>{tvShows?.name}</h2>
            <button
              className='text-2xl text-yellow-400'
              onClick={() =>
                toggleFavorites(tvShows.id, tvShows.name, tvShows.poster_path)
              }
            >
              {isFavorite(tvShows.id) ? '★' : '☆'}
            </button>
          </div>
          <p>{tvShows?.overview}</p>
          <ul>
            {tvShows?.genres.map((genre: any) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <section>
        <ul className='flex flex-wrap gap-4'>
          {recommendedMovies?.slice(10).map((tvShows: any) => (
            <li className='w-24' key={tvShows.id}>
              <Link
                href={`/tv/${tvShows.id}`}
                className='hover:opacity-80 transition-opacity duration-100'
              >
                <Image
                  src={`${API_IMG_URL}${tvShows.poster_path}`}
                  className='mb-4'
                  alt={tvShows.name}
                  height={192}
                  width={128}
                />
                <h3>{tvShows.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default TvDetail
