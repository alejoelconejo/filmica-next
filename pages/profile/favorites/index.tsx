import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { unstable_getServerSession } from 'next-auth'
import Image from 'next/image'
import { useEffect } from 'react'
import { API_IMG_URL, PROFILE_SIZES } from '../../../api'
import { useFavorites } from '../../../contexts/FavoriteContext'
import { db } from '../../../utils/firebaseConfig'
import { authOptions } from '../../api/auth/[...nextauth]'

interface Props {
  userID: string
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
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
  const {
    addToFavorites,
    favoritesItems,
    setFavoritesItems,
    isFavorite,
    removeFromFavorites,
  } = useFavorites()

  useEffect(() => {
    const q = query(
      collection(db, 'favorites')
      // where('userID', '==', userID)
      // limit(1)
    )
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const { favs } = doc.data()

          console.log(doc.data())
          setFavoritesItems(favs)
        })
      })
      .catch((e) => console.log(e))
  }, [userID, setFavoritesItems])

  const toggleFavorites = (id: number, title: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  }

  return (
    <>
      <h2 className='text-3xl font-semibold mb-4'>Favorites Profile</h2>
      <section className='mb-8'>
        {favoritesItems.length ? (
          <ul className='flex flex-col gap-2'>
            {favoritesItems.map(({ id, img, title }) => (
              <li className='flex gap-4' key={id}>
                <Image
                  alt={title}
                  src={`${API_IMG_URL}${PROFILE_SIZES.md}${img}`}
                  height={150}
                  width={75}
                />
                <h3>{title}</h3>
                <button
                  className='text-2xl text-yellow-400'
                  onClick={() => toggleFavorites(id, title, img)}
                >
                  {isFavorite(id) ? '★' : 'vacio'}
                </button>
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
