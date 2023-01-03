import { collection, getDocs, query, where } from 'firebase/firestore'
import { DefaultUser, Session, unstable_getServerSession } from 'next-auth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { API_IMG_URL, PROFILE_SIZES } from '../../../api'
import { db } from '../../../utils/firebaseConfig'
import { authOptions } from '../../api/auth/[...nextauth]'

interface Favorite {
  id: string
  title: string
  img: string
}

interface FavoriteUser {
  userID: string
  favs: Favorite[]
}

interface Props {
  userID: string
}

interface IdSession extends Session {
  user: DefaultUser
}

export async function getServerSideProps(context: any) {
  const session: IdSession | null = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const userID = session.user.id

  return {
    props: {
      userID,
    },
  }
}

const Favorites = ({ userID }: Props) => {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    const q = query(collection(db, 'favorites'), where('userID', '==', userID))
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const { favs } = doc.data()
          setFavorites(favs)
        })
      })
      .catch((e) => console.log(e))
  }, [userID])

  return (
    <>
      <h2 className='text-3xl font-semibold mb-4'>Favorites</h2>
      <section className='mb-8'>
        {favorites.length ? (
          <ul className='flex flex-col gap-2'>
            {favorites.map((favorite: any) => (
              <li className='flex gap-4' key={favorite.id}>
                <Image
                  alt={favorite.title}
                  src={`${API_IMG_URL}${PROFILE_SIZES.md}${favorite.img}`}
                  height={150}
                  width={75}
                />
                <h3>{favorite.title}</h3>
                <button className='text-2xl text-yellow-400'>★</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet 😕</p>
        )}
      </section>
      <div>
        <button className='border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors duration-100'>
          Remove all
        </button>
      </div>
    </>
  )
}

export default Favorites
