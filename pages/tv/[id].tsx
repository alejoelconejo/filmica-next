import Head from 'next/head'
import Link from 'next/link'

import { getTVShowDetail, getTVShowRecommended } from '../../api'
import { DetailGenres } from '../../components/DetailGenres'
import { DetailLargeText } from '../../components/DetailLargeText'
import { DetailMovieTVImage } from '../../components/DetailMovieTVImage'
import { DetailTitle } from '../../components/DetailTitle'
import { DetailTVListSlider } from '../../components/DetailTVListSlider'
import { DetailTVShowData } from '../../components/DetailTVShowData'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { TvShowsListResult, TvShowDetail } from '../../types'

interface Props {
  tvShow: TvShowDetail
  recommendedTvShows: TvShowsListResult[]
}

export default function TvDetail({ tvShow, recommendedTvShows }: Props) {
  const { id, name, poster_path, overview } = tvShow

  return (
    <>
      <Head>
        <title key='title'>{name} - Filmica</title>
        <meta name='description' key='description' content={name} />
      </Head>
      <div>
        <div className='flex md:flex-row flex-col gap-4 mb-8'>
          <DetailMovieTVImage title={name} posterPath={poster_path} />
          <div className='flex flex-1 flex-col'>
            <div className='flex justify-between items-start'>
              <DetailTitle title={name} />
              <button
                className={`text-2xl bg-neutral-400/20 p-2 rounded-full`}
                // onClick={() =>
                //   toggleFavorites(movie.id, movie.title, movie.poster_path)
                // }
              >
                <FavoriteIcon />
              </button>
            </div>
            <section>
              <ul className='flex gap-4 flex-wrap'>
                {tvShow.created_by.map((creator) => (
                  <li key={creator.id}>
                    <Link href={`/person/${creator.id}`}>{creator.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <DetailTVShowData tvShow={tvShow} />
            <section className='mt-4 mb-8'>
              <DetailLargeText text={overview} />
            </section>
            <DetailGenres movieTV={tvShow} />
          </div>
        </div>
        <DetailTVListSlider
          title='Recommended TV Shows'
          items={recommendedTvShows}
        />
      </div>
    </>
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
