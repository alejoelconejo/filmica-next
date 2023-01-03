import Image from 'next/image'
import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_IMG_URL,
  API_KEY,
  PROFILE_SIZES,
} from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'
import { Person } from '../../types'

interface Props {
  person: Person
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/person/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`

  const res = await fetch(endPoint)
  const person: Person = await res.json()

  return {
    props: {
      person,
    },
  }
}

const PersonDetail = ({ person }: Props) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, name: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, name, img) : removeFromFavorites(id)
  }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-8 mb-8'>
        <Image
          src={`${API_IMG_URL}${PROFILE_SIZES.md}${person.profile_path}`}
          className='object-contain'
          alt={person.name}
          height={278}
          width={185}
        />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-3xl'>{person.name}</h2>
            <button
              className='text-2xl text-yellow-400'
              onClick={() =>
                toggleFavorites(person.id, person.name, person.profile_path)
              }
            >
              {isFavorite(person.id) ? '★' : '☆'}
            </button>
          </div>
          <p>{person.biography}</p>
        </div>
      </div>
    </div>
  )
}

export default PersonDetail
