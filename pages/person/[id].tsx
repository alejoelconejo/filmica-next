import Image from 'next/image'
import { API_BASE_URL, API_IMG_URL, API_KEY } from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'

interface IPeople {
  birthday: string
  known_for_department: string
  deathday?: string
  id: number
  name: string
  also_known_as: string[]
  gender: number
  biography: string
  popularity: number
  place_of_birth: string
  profile_path: string
  adult: boolean
  imdb_id: string
  homepage?: string
}

interface Props {
  persons: IPeople
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  const endPoint = `${API_BASE_URL}/person/${id}?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(endPoint)
  const persons = await res.json()

  return {
    props: {
      persons,
    },
  }
}

const PersonDetail = ({ persons }: Props) => {
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, name: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, name, img) : removeFromFavorites(id)
  }

  return (
    <div>
      <div className='flex md:flex-row flex-col gap-4 mb-8'>
        <Image
          src={`${API_IMG_URL}${persons.profile_path}`}
          className='h-96 object-contain'
          alt={persons.name}
          height={384}
          width={256}
        />
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-3xl'>{persons.name}</h2>
            <button
              className='text-2xl text-yellow-400'
              onClick={() =>
                toggleFavorites(persons.id, persons.name, persons.profile_path)
              }
            >
              {isFavorite(persons.id) ? '★' : '☆'}
            </button>
          </div>
          <p>{persons.biography}</p>
        </div>
      </div>
    </div>
  )
}

export default PersonDetail
