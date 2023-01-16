import { unstable_getServerSession } from 'next-auth'
import toast, { Toaster } from 'react-hot-toast'

import { getMovieCredits, getMovieDetail, getMovieRecommended } from '../../api'
import { authOptions } from '../api/auth/[...nextauth]'
import { DetailMovieListSlider } from '../../components/DetailMovieListSlider'
import { DetailCrewListSlider } from '../../components/DetailCrewListSlider'
import { DetailCastListSlider } from '../../components/DetailCastListSlider'
import { DetailLargeText } from '../../components/DetailLargeText'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { DetailMovieTVImage } from '../../components/DetailMovieTVImage'
import { DetailTitle } from '../../components/DetailTitle'
import {
  Cast,
  Crew,
  MovieDetail,
  MovieListResult,
  UserFavorite,
} from '../../types'
import { DetailMovieData } from '../../components/DetailMovieData'
import { DetailGenres } from '../../components/DetailGenres'
import {
  useAddFavorite,
  useCheckIsFavorite,
  useRemoveFavorite,
} from '../../hooks/useFavorites'
import { useToggle } from '../../hooks/useToggle'
import { DialogSignIn } from '../../components/DialogSignIn'
import { HeadCustom } from '../../components/HeadCustom'

interface Props {
  userId: string
  movie: MovieDetail
  recommendedMovies: MovieListResult[]
  crew: Crew[]
  cast: Cast[]
  directors: Crew[]
}

function MovieDetail({
  userId,
  movie,
  recommendedMovies,
  crew,
  cast,
  directors,
}: Props) {
  const [isOpen, toggleOpen] = useToggle(false)

  const { id, title, poster_path, overview } = movie

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
      <HeadCustom title={`${title} - Filmica`} description={movie.overview} />
      <div>
        <div className='flex md:flex-row sm:flex-row flex-col gap-4 mb-16'>
          <DetailMovieTVImage title={title} posterPath={poster_path} />
          <div className='flex flex-1 flex-col'>
            <div className='flex justify-between items-start'>
              <DetailTitle title={title} />
              <button
                className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                  isFavorite ? 'text-red-500' : 'text-transparent'
                } `}
                onClick={() =>
                  toggleFavorites({
                    id,
                    title,
                    img: poster_path,
                    type: 'movie',
                    userId,
                  })
                }
              >
                <FavoriteIcon />
              </button>
            </div>
            <DetailMovieData directors={directors} movie={movie} />
            <section className='mb-8'>
              <DetailLargeText text={overview} />
            </section>
            <DetailGenres movieTV={movie} />
          </div>
        </div>
        <DetailCastListSlider items={cast} title='Cast' />
        <DetailCrewListSlider items={crew} title='Crew' />
        <DetailMovieListSlider
          title='Recommended Films'
          items={recommendedMovies}
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

  const movie = await getMovieDetail(id)
  const recommendedMovies = await getMovieRecommended(id)
  const { crew, cast } = await getMovieCredits(id)

  const directors = crew.filter((person) => person.job === 'Director')

  return {
    props: {
      userId,
      movie,
      recommendedMovies,
      crew,
      cast,
      directors,
    },
  }
}

export default MovieDetail
