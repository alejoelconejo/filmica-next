import Image from 'next/image'
import Link from 'next/link'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
} from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'
import { TvShowsListResult, TvShow } from '../../types'

interface Props {
  tvShow: TvShow
  recommendedTvShows: TvShowsListResult[]
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`

  const res = await fetch(endPoint)
  const tvShow: TvShow = await res.json()

  const recommendedEndPoint = `${API_BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`

  const recommendedRes = await fetch(recommendedEndPoint)
  const dataTvShows = await recommendedRes.json()
  const recommendedTvShows: TvShowsListResult[] = await dataTvShows.results

  return {
    props: {
      tvShow,
      recommendedTvShows,
    },
  }
}

const TvDetail = ({ tvShow, recommendedTvShows }: Props) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, title: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${tvShow.poster_path}`}
          className='h-96 object-contain'
          alt={tvShow.name}
          height={384}
          width={256}
        />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-3xl'>{tvShow.name}</h2>
            <button
              className='text-2xl text-yellow-400'
              onClick={() =>
                toggleFavorites(tvShow.id, tvShow.name, tvShow.poster_path)
              }
            >
              {isFavorite(tvShow.id) ? '★' : '☆'}
            </button>
          </div>
          <p>{tvShow.overview}</p>
          <ul>
            {tvShow.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {recommendedTvShows.length ? (
        <section>
          <h3 className='text-2xl mb-4'>Recommended TV Shows</h3>
          <ul className='flex flex-wrap gap-4'>
            {recommendedTvShows.map((tvShow) => (
              <li className='w-24' key={tvShow.id}>
                <Link
                  href={`/tv/${tvShow.id}`}
                  className='hover:opacity-80 transition-opacity duration-100'
                >
                  <Image
                    src={`${API_IMG_URL}${tvShow.poster_path}`}
                    className='mb-4'
                    alt={tvShow.name}
                    title={tvShow.name}
                    height={192}
                    width={128}
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

export default TvDetail
