import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

import { getTVShowDetail, getTVShowRecommended } from '../../api'
import { DetailGenres } from '../../components/DetailGenres'
import { DetailLargeText } from '../../components/DetailLargeText'
import { DetailMovieTVImage } from '../../components/DetailMovieTVImage'
import { DetailTitle } from '../../components/DetailTitle'
import { DetailTVListSlider } from '../../components/DetailTVListSlider'
import { DetailTVShowData } from '../../components/DetailTVShowData'
import { DialogSignIn } from '../../components/DialogSignIn'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { HeadCustom } from '../../components/HeadCustom'
import {
  useAddFavorite,
  useCheckIsFavorite,
  useRemoveFavorite,
} from '../../hooks/useFavorites'
import { useToggle } from '../../hooks/useToggle'
import { TvShowsListResult, TvShowDetail, UserFavorite } from '../../types'
import { authOptions } from '../api/auth/[...nextauth]'

interface Props {
  userId: string
  tvShow: TvShowDetail
  recommendedTvShows: TvShowsListResult[]
}

export default function TvDetail({
  userId,
  tvShow,
  recommendedTvShows,
}: Props) {
  const [isOpen, toggleOpen] = useToggle(false)

  const { id, name, poster_path, overview } = tvShow

  const {
    isLoading,
    isError,
    data: isFavorite,
    error,
  } = useCheckIsFavorite({ id, userId })

  const addFavorite = useAddFavorite(userId)
  const removeFavorite = useRemoveFavorite(userId)

  const handleAddFavorite = ({
    id,
    title,
    img,
    type,
    userId,
  }: UserFavorite) => {
    addFavorite.mutate({ id, title, img, type, userId })
    toast.success('Added to your favorites!')
  }

  const handleRemoveFavorite = ({
    id,
    title,
    img,
    type,
    userId,
  }: UserFavorite) => {
    removeFavorite.mutate({ id, title, img, type, userId })
    toast.success('Removed from your favorites!')
  }

  const toggleFavorites = ({ id, title, img, type, userId }: UserFavorite) => {
    if (!userId) {
      toggleOpen()
    } else {
      isFavorite
        ? handleRemoveFavorite({ id, title, img, type, userId })
        : handleAddFavorite({ id, title, img, type, userId })
    }
  }

  return (
    <>
      <HeadCustom title={`${name} - Filmica`} description={tvShow.overview} />
      <div>
        <div className='flex md:flex-row flex-col gap-4 mb-16'>
          <DetailMovieTVImage title={name} posterPath={poster_path} />
          <div className='flex flex-1 flex-col'>
            <div className='flex justify-between items-start'>
              <DetailTitle title={name} />
              <button
                className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                  isFavorite ? 'text-red-500' : 'text-transparent'
                } `}
                onClick={() =>
                  toggleFavorites({
                    id,
                    title: name,
                    img: poster_path,
                    type: 'tv',
                    userId,
                  })
                }
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
      <Toaster />
      <DialogSignIn isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  const userId = session ? session.user.id : null
  const { id } = context.params

  const tvShow = await getTVShowDetail(id)
  const recommendedTvShows = await getTVShowRecommended(id)

  return {
    props: {
      userId,
      tvShow,
      recommendedTvShows,
    },
  }
}
