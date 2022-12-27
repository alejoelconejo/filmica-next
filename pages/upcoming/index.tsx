import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_BASE_URL, API_KEY_PUBLIC } from '../../api'
import { ListGrid } from '../../components/ListGrid'
import { ListGridItem } from '../../components/ListGridItem'
import { Spinner } from '../../components/Spinner'

export const Upcoming = () => {
  const [movies, setMovies] = useState<any>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const endPoint = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY_PUBLIC}&language=es-ES&page=${page}`
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
      <h2 className='text-3xl font-semibold mb-4'>Upcoming</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={page < totalPages}
        loader={<Spinner />}
      >
        <ListGrid>
          {movies.map((movie: any) => (
            <ListGridItem key={movie.id} item={movie} />
          ))}
        </ListGrid>
      </InfiniteScroll>
    </section>
  )
}

export default Upcoming
