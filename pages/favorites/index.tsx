import { unstable_getServerSession } from 'next-auth'
import Image from 'next/image'
import { toast, Toaster } from 'react-hot-toast'
import { API_IMG_URL, PROFILE_SIZES } from '../../api'
import { Spinner } from '../../components/Spinner'
import {
  useGetFavorites,
  useRemoveAllFavorites,
  useRemoveFavorite,
} from '../../hooks/useFavorites'
import { UserFavorite } from '../../types'
import { authOptions } from '../api/auth/[...nextauth]'

interface Props {
  userId: string
}

const Favorites = ({ userId }: Props) => {
  const { isLoading, isError, data, error } = useGetFavorites(userId)
  const removeFavorite = useRemoveFavorite(userId)
  const removeAllFavorites = useRemoveAllFavorites(userId)

  function handleRemoveFavorite({ id, title, img, userId }: UserFavorite) {
    removeFavorite.mutate({ id, title, img, userId })
    toast.success('Removed from your favorites!')
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <h2 className='text-3xl font-semibold mb-8'>My Favorites</h2>
      <section className='mb-8'>
        {data ? (
          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8'>
            {data.map(({ id, img, title }) => (
              <li className='flex gap-4' key={id}>
                <div className='relative'>
                  <Image
                    className='w-auto'
                    alt={title}
                    src={`${API_IMG_URL}${PROFILE_SIZES.md}${img}`}
                    height={300}
                    width={150}
                    title={title}
                  />
                  <div className='flex gap-2 absolute top-2 right-2'>
                    <button
                      className='text-2xl bg-neutral-400/20 p-2 rounded-full text-red-500 hover:text-neutral-400/20 transition'
                      aria-label='Remove from favorites'
                      title='Remove from favorites'
                      onClick={() =>
                        handleRemoveFavorite({ id, title, img, userId })
                      }
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
          onClick={() => removeAllFavorites.mutate(userId)}
        >
          Remove all
        </button>
      </div>
      <Toaster />
    </>
  )
}

export default Favorites

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

  return {
    props: {
      userId,
    },
  }
}
