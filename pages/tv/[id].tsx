import Link from 'next/link'

import { getTVShowDetail, getTVShowRecommended } from '../../api'
import { DetailGenres } from '../../components/DetailGenres'
import { DetailLargeText } from '../../components/DetailLargeText'
import { DetailMovieTVImage } from '../../components/DetailMovieTVImage'
import { DetailTitle } from '../../components/DetailTitle'
import { DetailTVListSlider } from '../../components/DetailTVListSlider'
import { DetailTVShowData } from '../../components/DetailTVShowData'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { useFavorites } from '../../contexts/FavoriteContext'
import { TvShowsListResult, TvShowDetail } from '../../types'

interface Props {
  tvShow: TvShowDetail
  recommendedTvShows: TvShowsListResult[]
}

export default function TvDetail({ tvShow, recommendedTvShows }: Props) {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  // const toggleFavorites = (id: number, title: string, img: string) => {
  //   !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  // }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <DetailMovieTVImage
          title={tvShow.name}
          posterPath={tvShow.poster_path}
        />
        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between items-start'>
            <DetailTitle title={tvShow.name} />
            <button
              className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                isFavorite(tvShow.id) ? 'text-red-500' : 'text-transparent'
              }`}
              // onClick={() =>
              //   toggleFavorites(movie.id, movie.title, movie.poster_path)
              // }
            >
              <FavoriteIcon />
            </button>
          </div>
          <section>
            {tvShow.created_by.map((creator) => (
              <Link href={`/person/${creator.id}`} key={creator.id}>
                {creator.name}
              </Link>
            ))}
          </section>
          <DetailTVShowData tvShow={tvShow} />
          <section className='mt-4 mb-8'>
            <DetailLargeText text={tvShow.overview} />
          </section>
          <DetailGenres movieTV={tvShow} />
        </div>
      </div>
      <DetailTVListSlider
        title='Recommended TV Shows'
        items={recommendedTvShows}
      />
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const tvShow = await getTVShowDetail(id)
  const recommendedTvShows = await getTVShowRecommended(id)

  return {
    props: {
      tvShow,
      recommendedTvShows,
    },
  }
}
