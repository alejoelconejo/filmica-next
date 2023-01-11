import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { unstable_getServerSession } from 'next-auth'
import Image from 'next/image'
import { API_IMG_URL, PROFILE_SIZES } from '../../api'
import { Spinner } from '../../components/Spinner'
import {
  FavoritesItem,
  getFavorites,
  removeAllFavorites,
  removeFromFavorites,
} from '../../utils/firebaseApi'
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

  return {
    props: {
      userId,
    },
  }
}

const Favorites = ({ userId }: Props) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => getFavorites(userId),
  })

  const mutation = useMutation({
    mutationFn: (userId: string) => removeAllFavorites(userId),
  })

  const mutationSingle = useMutation({
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

  if (isLoading) return <Spinner />

  return (
    <>
      <h2 className='text-3xl font-semibold mb-8'>My Favorites</h2>
      <section className='mb-8'>
        {data ? (
          <ul className='flex flex-col gap-2'>
            {data.map(({ id, img, title }) => (
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
                    onClick={() =>
                      mutationSingle.mutate({ id, title, img, userId })
                    }
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
          onClick={() => mutation.mutate(userId)}
        >
          Remove all
        </button>
      </div>
    </>
  )
}

export default Favorites
