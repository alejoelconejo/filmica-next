import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_BASE_URL, API_KEY_PUBLIC } from '../../api'
import { ListGrid } from '../../components/ListGrid'
import { ListGridItem } from '../../components/ListGridItem'

export const Trending = () => {
  const [movies, setMovies] = useState<any>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const endPoint = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY_PUBLIC}&language=es-ES&page=${page}`
    fetch(endPoint)
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

  return (
    <section>
      <h2 className='text-3xl font-semibold mb-4'>Trending</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={page < totalPages}
        loader={<h4>Loading...</h4>}
      >
        <ListGrid>
          {movies.map((movie: any) => (
            <li
              key={movie.id}
              className='bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden'
            >
              <ListGridItem key={movie.id} item={movie} />
            </li>
          ))}
        </ListGrid>
      </InfiniteScroll>
    </section>
  )
}

export default Trending
