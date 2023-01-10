import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY_PUBLIC } from '../../api'
import { SearchResultsItem } from '../../components/SearchResultsItem'
import { Spinner } from '../../components/Spinner'
import { SearchResult } from '../../types'

export default function Results() {
  const router = useRouter()
  const keywords = router.query.kwd

  const [items, setItems] = useState<SearchResult[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (!keywords) return
    const endPoint = `${API_BASE_URL}/search/multi?api_key=${API_KEY_PUBLIC}&language=${API_DEFAULT_LANGUAGE}&query=${keywords}&page=${page}`
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data.results])
        setTotalPages(data.total_pages)
      })
  }, [page, keywords])

  const fetchMoreData = async () => {
    if (page < totalPages) {
      setPage((page) => page + 1)
    }
  }

  return (
    <>
      <Head>
        <title key='title'>{keywords} - Filmica</title>
        <meta
          name='description'
          key='description'
          content={keywords as string}
        />
      </Head>
      <section>
        <h2 className='mb-2 text-2xl font-semibold'>Results</h2>
        <p className='text-xl mb-4'>
          Your are looking for <span className='italic'>{keywords}</span>
        </p>
        {items.length ? (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={page < totalPages}
            loader={<Spinner />}
          >
            <section className='mt-8 w-full overflow-hidden'>
              <ul className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] text-black gap-4'>
                {items.map((result) => (
                  <SearchResultsItem key={result.id} result={result} />
                ))}
              </ul>
            </section>
          </InfiniteScroll>
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </>
  )
}
