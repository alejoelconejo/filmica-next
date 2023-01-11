import Head from 'next/head'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY_PUBLIC } from '../../api'
import { ListGrid } from '../../components/ListGrid'
import { ListTvShowGridItem } from '../../components/ListTvShowGridItem'
import { Spinner } from '../../components/Spinner'
import { TvShowsListResult } from '../../types'

export const TopRatedTV = () => {
  const [tvShows, setTvShows] = useState<TvShowsListResult[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const endPoint = `${API_BASE_URL}/tv/top_rated?api_key=${API_KEY_PUBLIC}&language=${API_DEFAULT_LANGUAGE}&page=${page}`
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setTvShows((prevTvShows) => [...prevTvShows, ...data.results])
        setTotalPages(data.total_pages)
      })
  }, [page])

  const fetchMoreData = async () => {
    if (page < totalPages) {
      setPage((page) => page + 1)
    }
  }

  return (
    <>
      <Head>
        <title key='title'>Top Rated TV Shows - Filmica</title>
        <meta
          name='description'
          key='description'
          content='Top Rated Tv Shows'
        />
      </Head>
      <section>
        <h2 className='text-3xl font-semibold mb-4'>Top Rated TV Shows</h2>
        <InfiniteScroll
          dataLength={tvShows.length}
          next={fetchMoreData}
          hasMore={page < totalPages}
          loader={<Spinner />}
        >
          <ListGrid>
            {tvShows.map((tvShow) => (
              <ListTvShowGridItem key={tvShow.id} item={tvShow} />
            ))}
          </ListGrid>
        </InfiniteScroll>
      </section>
    </>
  )
}

export default TopRatedTV
