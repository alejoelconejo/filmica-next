import { getPersonCredits, getPersonDetail } from '../../api'
import { DetailLargeText } from '../../components/DetailLargeText'
import { DetailMovieListSlider } from '../../components/DetailMovieListSlider'
import { DetailPersonImage } from '../../components/DetailPersonImage'
import { DetailTitle } from '../../components/DetailTitle'
import { FavoriteIcon } from '../../components/FavoriteIcon'
import { useFavorites } from '../../contexts/FavoriteContext'
import { Person, PersonCast, PersonCrew } from '../../types'
import { DetailPersonData } from '../../components/DetailPersonData'

interface Props {
  person: Person
  crew: PersonCrew[]
  cast: PersonCast[]
}

export default function PersonDetail({ person, crew, cast }: Props) {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  // const toggleFavorites = (id: number, name: string, img: string) => {
  //   !isFavorite(id) ? addToFavorites(id, name, img) : removeFromFavorites(id)
  // }

  return (
    <div>
      <div className='flex md:flex-row sm:flex-row flex-col gap-8 mb-8'>
        <DetailPersonImage
          name={person.name}
          profilePath={person.profile_path}
        />
        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between items-start'>
            <DetailTitle title={person.name} />
            <button
              className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                isFavorite(person.id) ? 'text-red-500' : 'text-transparent'
              }`}
              // onClick={() =>
              //   toggleFavorites(movie.id, movie.title, movie.poster_path)
              // }
            >
              <FavoriteIcon />
            </button>
          </div>
          <DetailPersonData person={person} />
          {person.biography ? (
            <section className='mt-4'>
              <DetailLargeText text={person.biography} />
            </section>
          ) : (
            ''
          )}
        </div>
      </div>
      {crew.length ? (
        <DetailMovieListSlider title='Participates in' items={crew} />
      ) : (
        ''
      )}
      {cast.length ? (
        <DetailMovieListSlider title='Acts in' items={cast} />
      ) : (
        ''
      )}
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const person = await getPersonDetail(id)
  const { crew, cast } = await getPersonCredits(id)

  return {
    props: {
      person,
      crew,
      cast,
    },
  }
}
