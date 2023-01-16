import { unstable_getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'
import { FavoriteItem } from '../../components/FavoriteItem'
import { Spinner } from '../../components/Spinner'
import {
  useGetFavorites,
  useRemoveAllFavorites,
} from '../../hooks/useFavorites'
import { authOptions } from '../api/auth/[...nextauth]'

interface Props {
  userId: string
}

const Favorites = ({ userId }: Props) => {
  const { isLoading, isError, data, error } = useGetFavorites(userId)
  const removeAllFavorites = useRemoveAllFavorites(userId)

  if (isLoading) return <Spinner />

  return (
    <>
      <h2 className='text-3xl font-semibold mb-8'>My Favorites</h2>
      <section className='mb-8'>
        {data ? (
          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8'>
            {data.map(({ id, img, title, type }) => (
              <FavoriteItem
                key={id}
                id={id}
                img={img}
                title={title}
                type={type}
                userId={userId}
              />
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
