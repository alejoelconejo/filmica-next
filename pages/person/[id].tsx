import Head from 'next/head'

import { getPersonCredits, getPersonDetail } from '../../api'
import { DetailLargeText } from '../../components/DetailLargeText'
import { DetailMovieListSlider } from '../../components/DetailMovieListSlider'
import { DetailPersonImage } from '../../components/DetailPersonImage'
import { DetailTitle } from '../../components/DetailTitle'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { Person, PersonCast, PersonCrew } from '../../types'
import { DetailPersonData } from '../../components/DetailPersonData'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import {
  useAddFavorite,
  useCheckIsFavorite,
  useRemoveFavorite,
} from '../../hooks/useFavorites'

interface Props {
  userId: string
  person: Person
  crew: PersonCrew[]
  cast: PersonCast[]
}

export default function PersonDetail({ userId, person, crew, cast }: Props) {
  const { id, name, profile_path, biography } = person

  const {
    isLoading,
    isError,
    data: isFavorite,
    error,
  } = useCheckIsFavorite({ id, userId })

  const addFavorite = useAddFavorite(userId)
  const removeFavorite = useRemoveFavorite(userId)

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
      ? removeFavorite.mutate({ id, title, img, userId })
      : addFavorite.mutate({ id, title, img, userId })
  }

  return (
    <>
      <Head>
        <title key='title'>{name} - Filmica</title>
        <meta name='description' key='description' content={name} />
      </Head>
      <div>
        <div className='flex md:flex-row sm:flex-row flex-col gap-8 mb-8'>
          <DetailPersonImage name={name} profilePath={profile_path} />
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
                    img: profile_path,
                    userId,
                  })
                }
              >
                <FavoriteIcon />
              </button>
            </div>
            <DetailPersonData person={person} />
            {person.biography ? (
              <section className='mt-4'>
                <DetailLargeText text={biography} />
              </section>
            ) : null}
          </div>
        </div>
        {crew.length ? (
          <DetailMovieListSlider title='Participates in' items={crew} />
        ) : null}
        {cast.length ? (
          <DetailMovieListSlider title='Acts in' items={cast} />
        ) : null}
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

  const person = await getPersonDetail(id)
  const { crew, cast } = await getPersonCredits(id)

  return {
    props: {
      userId,
      person,
      crew,
      cast,
    },
  }
}
