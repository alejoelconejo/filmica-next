import { unstable_getServerSession } from 'next-auth'
import Image from 'next/image'
import { API_IMG_URL, PROFILE_SIZES } from '../../api'
import {
  FavoritesItem,
  getFavorites,
  useFavorites,
} from '../../contexts/FavoriteContext'
import { authOptions } from '../api/auth/[...nextauth]'

interface Props {
  userId: string
  favorites: FavoritesItem[]
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

  const userId = session.user.id

  const favorites = await getFavorites(userId)

  return {
    props: {
      userId,
      favorites,
    },
  }
}

const Favorites = ({ userId, favorites }: Props) => {
  const {
    addToFavorites,
    favoritesItems,
    setFavoritesItems,
    isFavorite,
    removeFromFavorites,
    removeAllFavorites,
  } = useFavorites()

  return (
    <>
      <h2 className='text-3xl font-semibold mb-4'>Favorites Profile</h2>
      <section className='mb-8'>
        {favorites ? (
          <ul className='flex flex-col gap-2'>
            {favorites.map(({ id, img, title }) => (
              <li className='flex gap-4' key={id}>
                <Image
                  alt={title}
                  src={`${API_IMG_URL}${PROFILE_SIZES.md}${img}`}
                  height={150}
                  width={75}
                />
                <div className='flex gap-2'>
                  <h3 className='text-xl'>{title}</h3>
                  <button
                    className='h-9 w-9 text-2xl bg-neutral-400/20 p-2 rounded-full text-red-500'
                    onClick={() => removeFromFavorites(id, title, img, userId)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
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
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet 😕</p>
        )}
      </section>
      <div>
        <button
          className='border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors duration-100'
          onClick={() => removeAllFavorites(userId)}
        >
          Remove all
        </button>
      </div>
    </>
  )
}

export default Favorites
