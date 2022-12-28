import Image from 'next/image'
import { API_IMG_URL } from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'

const Favorites = () => {
  const { favoritesItems, removeAllFavorites, removeFromFavorites } =
    useFavorites()

  return (
    <>
      <h2 className='text-3xl font-semibold mb-4'>Favorites</h2>
      <section className='mb-8'>
        <ul className='flex flex-col gap-2'>
          {favoritesItems?.map((favorite) => (
            <li className='flex gap-4' key={favorite.id}>
              <Image
                alt={favorite.title}
                src={`${API_IMG_URL}${favorite.img}`}
                height={150}
                width={75}
              />
              <h3>{favorite.title}</h3>
              <button
                className='text-2xl text-yellow-400'
                onClick={() => removeFromFavorites(favorite.id)}
              >
                ★
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div>
        <button
          className='border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors duration-100'
          onClick={removeAllFavorites}
        >
          Remove all
        </button>
      </div>
    </>
  )
}

export default Favorites
