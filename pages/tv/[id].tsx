import Image from 'next/image'
import Link from 'next/link'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
  POSTER_SIZES,
} from '../../api'
import { DetailLargeText } from '../../components/DetailLargeText'
import { DetailTVListSlider } from '../../components/DetailTVListSlider'
import { useFavorites } from '../../contexts/FavoriteContext'
import { TvShowsListResult, TvShow } from '../../types'
import getYearFromString from '../../utils/getYearFromString'
import roundNumOneDecimal from '../../utils/roundNumOneDecimal'

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

  // const toggleFavorites = (id: number, title: string, img: string) => {
  //   !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  // }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${POSTER_SIZES.lg}${tvShow.poster_path}`}
          className='mx-auto rounded border-2 border-orange-400/20'
          alt={tvShow.name}
          height={384}
          width={256}
        />
        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between items-start'>
            <h2 className='text-4xl font-semibold'>{tvShow.name}</h2>
            <button
              className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                isFavorite(tvShow.id) ? 'text-red-500' : 'text-transparent'
              }`}
              // onClick={() =>
              //   toggleFavorites(movie.id, movie.title, movie.poster_path)
              // }
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
            {tvShow.created_by.map((creator) => (
              <Link href={`/person/${creator.id}`} key={creator.id}>
                {creator.name}
              </Link>
            ))}
          </section>
          <section className='text-sm text-neutral-300 flex gap-1 mb-1'>
            {tvShow.first_air_date ? (
              <span>
                {getYearFromString(tvShow.first_air_date)}
                <span className='ml-1'>-</span>
                {tvShow.last_air_date ? (
                  <span className='ml-1'>
                    {getYearFromString(tvShow.last_air_date)}
                  </span>
                ) : (
                  ''
                )}
                <span className='text-neutral-400 ml-1'>•</span>
              </span>
            ) : (
              ''
            )}
            {tvShow.episode_run_time ? (
              <span>
                {tvShow.episode_run_time} min.
                <span className='text-neutral-400 ml-1'>•</span>
              </span>
            ) : (
              ''
            )}
            {tvShow.origin_country ? <span>{tvShow.origin_country}</span> : ''}
          </section>
          {tvShow.vote_count ? (
            <p className='text-sm text-neutral-300'>
              <span className='mr-[0.15rem] text-yellow-400'>★</span>
              {roundNumOneDecimal(tvShow.vote_average)}
              <span className='text-xs ml-1'>({tvShow.vote_count})</span>
            </p>
          ) : (
            ''
          )}
          <p className='text-sm text-neutral-300 flex gap-2 mt-1'>
            <span>Seasons: {tvShow.number_of_seasons}</span>
            <span>Episodes: {tvShow.number_of_episodes}</span>
          </p>
          <p className='mt-4 mb-8'>
            <DetailLargeText text={tvShow.overview} />
          </p>
          <ul className='flex flex-wrap gap-2 text-sm mb-4'>
            {tvShow.genres.map((genre) => (
              <li
                key={genre.id}
                className='border px-2 py-1 border-neutral-200 rounded-lg'
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {recommendedTvShows.length ? (
        <DetailTVListSlider
          title='Recommended TV Shows'
          items={recommendedTvShows}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default TvDetail
