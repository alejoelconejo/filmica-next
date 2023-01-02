import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY_PUBLIC } from '../../api'
import { ListGrid } from '../../components/ListGrid'
import { ListGridItem } from '../../components/ListGridItem'
import { Spinner } from '../../components/Spinner'
import { MovieListResult } from '../../types'

export const Upcoming = () => {
  const [movies, setMovies] = useState<MovieListResult[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const endPoint = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY_PUBLIC}&language=${API_DEFAULT_LANGUAGE}&page=${page}`
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data.results])
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
      <h2 className='text-3xl font-semibold mb-4'>Upcoming</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={page < totalPages}
        loader={<Spinner />}
      >
        <ListGrid>
          {movies.map((movie) => (
            <ListGridItem key={movie.id} item={movie} />
          ))}
        </ListGrid>
      </InfiniteScroll>
    </section>
  )
}

export default Upcoming
