import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'

import { getMovieCredits, getMovieDetail, getMovieRecommended } from '../../api'
import { authOptions } from '../api/auth/[...nextauth]'
import { DetailMovieListSlider } from '../../components/DetailMovieListSlider'
import { DetailCrewListSlider } from '../../components/DetailCrewListSlider'
import { DetailCastListSlider } from '../../components/DetailCastListSlider'
import { DetailLargeText } from '../../components/DetailLargeText'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { DetailMovieTVImage } from '../../components/DetailMovieTVImage'
import { DetailTitle } from '../../components/DetailTitle'
import { Cast, Crew, MovieDetail, MovieListResult } from '../../types'
import { DetailMovieData } from '../../components/DetailMovieData'
import { DetailGenres } from '../../components/DetailGenres'
import { useMutation } from '@tanstack/react-query'
import {
  addToFavorites,
  checkIsFavorite,
  removeFromFavorites,
} from '../../utils/firebaseApi'
import { useQuery } from '@tanstack/react-query'

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
  const toggleFavorites = ({
    id,
    title,
    img,
    userId,
  }: {
    id: number
    title: string
    img: string
    userId: string
  }) => {
    isFavorite
      ? mutationDel.mutate({ id, title, img, userId })
      : mutationAdd.mutate({ id, title, img, userId })
  }

  const { id, title, poster_path, overview } = movie

  const {
    isLoading,
    isError,
    data: isFavorite,
    error,
  } = useQuery({
    queryKey: ['favorites', { id, userId }],
    queryFn: () => checkIsFavorite({ id, userId }),
  })

  const mutationAdd = useMutation({
    mutationFn: ({
      id,
      title,
      img,
      userId,
    }: {
      id: number
      title: string
      img: string
      userId: string
    }) => addToFavorites({ id, title, img, userId }),
  })

  const mutationDel = useMutation({
    mutationFn: ({
      id,
      title,
      img,
      userId,
    }: {
      id: number
      title: string
      img: string
      userId: string
    }) => removeFromFavorites({ id, title, img, userId }),
  })

  return (
    <>
      <Head>
        <title key='title'>{title} - Filmica</title>
        <meta name='description' key='description' content={title} />
      </Head>
      <div>
        <div className='flex md:flex-row sm:flex-row flex-col gap-4 mb-8'>
          <DetailMovieTVImage title={title} posterPath={poster_path} />
          <div className='flex flex-1 flex-col'>
            <div className='flex justify-between items-start'>
              <DetailTitle title={title} />
              <button
                className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                  isFavorite ? 'text-red-500' : 'text-transparent'
                } `}
                onClick={() =>
                  toggleFavorites({ id, title, img: poster_path, userId })
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
