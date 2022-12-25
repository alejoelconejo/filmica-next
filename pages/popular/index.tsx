import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_BASE_URL, API_IMG_URL, API_KEY_PUBLIC } from '../../api'
import { useFavorites } from '../../contexts/FavoriteContext'

export const Popular = () => {
  const [movies, setMovies] = useState<any>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/movie/popular?api_key=${API_KEY_PUBLIC}&language=es-ES&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevMovies: any) => [...prevMovies, ...data.results])
        setTotalPages(data.total_pages)
      })
  }, [page])

  const fetchMoreData = async () => {
    if (page < totalPages) {
      setPage((page) => page + 1)
    }
  }

  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites()

  const toggleFavorites = (id: number, title: string, img: string) => {
    !isFavorite(id) ? addToFavorites(id, title, img) : removeFromFavorites(id)
  }

  return (
    <section>
      <h2 className='text-3xl font-semibold mb-4'>Popular</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={page < totalPages}
        loader={<h4>Loading...</h4>}
      >
        <ul className='grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4'>
          {movies.map((movie: any) => (
            <li
              key={movie.id}
              className='bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between'
            >
              <div>
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    className='rounded-t-lg mb-2'
                    src={`${API_IMG_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width={384}
                    height={576}
                  />
                </Link>
                <div className='px-4 py-2'>
                  <div className='flex justify-between items-start mb-2'>
                    <Link href={`/movie/${movie.id}`}>
                      <h3 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2'>
                        {movie.title}
                      </h3>
                    </Link>
                    <button
                      className='text-2xl text-yellow-400'
                      onClick={() =>
                        toggleFavorites(
                          movie.id,
                          movie.title,
                          movie.poster_path
                        )
                      }
                    >
                      {isFavorite(movie.id) ? '★' : '☆'}
                    </button>
                  </div>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    {movie.release_date}
                  </p>
                  <Link href={`/movie/${movie.id}`}>
                    <p className='font-normal text-gray-700 dark:text-gray-400 line-clamp-3'>
                      {movie.overview}
                    </p>
                  </Link>
                </div>
              </div>
              <Link
                href={`/movie/${movie.id}`}
                className='items-center w-fit m-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                View details
              </Link>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  )
}

export default Popular
