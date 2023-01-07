import Image from 'next/image'
import { useState } from 'react'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
  PROFILE_SIZES,
} from '../../api'
import { DetailMovieListSlider } from '../../components/DetailMovieListSlider'
import { useFavorites } from '../../contexts/FavoriteContext'
import { Person, PersonCast, PersonCrew } from '../../types'
import { getCountryFromPlace } from '../../utils/getCountryFromPlace'
import getYearFromString from '../../utils/getYearFromString'

interface Props {
  person: Person
  crew: PersonCrew[]
  cast: PersonCast[]
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/person/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const res = await fetch(endPoint)
  const person: Person = await res.json()

  const creditsEndPoint = `${API_BASE_URL}/person/${id}/credits?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const creditsRes = await fetch(creditsEndPoint)
  const dataCredits = await creditsRes.json()
  const crew: PersonCrew[] = await dataCredits.crew
  const cast: PersonCast[] = await dataCredits.cast

  return {
    props: {
      person,
      crew,
      cast,
    },
  }
}

const PersonDetail = ({ person, crew, cast }: Props) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  // const toggleFavorites = (id: number, name: string, img: string) => {
  //   !isFavorite(id) ? addToFavorites(id, name, img) : removeFromFavorites(id)
  // }

  const [isCollapsed, toggleCollapsed] = useState(true)

  return (
    <div>
      <div className='flex md:flex-row sm:flex-row flex-col gap-8 mb-8'>
        <div>
          <Image
            src={`${API_IMG_URL}${PROFILE_SIZES.md}${person.profile_path}`}
            className='mx-auto rounded border-2 border-green-400/20'
            alt={person.name}
            height={278}
            width={185}
          />
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between items-start'>
            <h2 className='text-4xl font-semibold'>{person.name}</h2>
            <button
              className={`text-2xl bg-neutral-400/20 p-2 rounded-full ${
                isFavorite(person.id) ? 'text-red-500' : 'text-transparent'
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
          <section className='text-sm text-neutral-300 flex flex-col gap-1 mb-1'>
            <span className='text-lg'>{person.known_for_department}</span>
            <div>
              <span>
                {person.birthday ? (
                  <span>{getYearFromString(person.birthday)}</span>
                ) : (
                  ''
                )}
                {person.place_of_birth ? (
                  <span className='ml-1'>
                    ({getCountryFromPlace(person.place_of_birth)})
                  </span>
                ) : (
                  ''
                )}
              </span>
              <span className='ml-1'>-</span>
              {person.deathday ? (
                <span>{getYearFromString(person.deathday)}</span>
              ) : (
                ''
              )}
            </div>
          </section>
          {person.biography ? (
            <section>
              <p className={`${isCollapsed ? 'line-clamp-5' : ''}`}>
                {person.biography}
              </p>
              <button
                className='text-sm border border-neutral-400 text-neutral-300 hover:text-neutral-100 transition rounded-full px-2 py-1 mt-2'
                onClick={() => toggleCollapsed((prevValue) => !prevValue)}
              >
                {isCollapsed ? 'Read more...' : 'Read less...'}
              </button>
            </section>
          ) : (
            ''
          )}
        </div>
      </div>
      {crew.length ? (
        <DetailMovieListSlider title='Participate in' items={crew} />
      ) : (
        ''
      )}
      {cast.length ? <DetailMovieListSlider title='Act in' items={cast} /> : ''}
    </div>
  )
}

export default PersonDetail
