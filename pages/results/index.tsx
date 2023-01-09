import Head from 'next/head'
import { useRouter } from 'next/router'
import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY } from '../../api'
import { SearchResultsItem } from '../../components/SearchResultsItem'
import { SearchList, SearchResult } from '../../types'

interface Props {
  searchResults: SearchResult[]
}

export async function getServerSideProps(context: any) {
  const keywords = context.query.kwd
  const endPoint = `${API_BASE_URL}/search/multi?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&query=${keywords}&page=1`
  const res = await fetch(endPoint)
  const data: SearchList = await res.json()
  const searchResults = data.results

  return {
    props: {
      searchResults,
    },
  }
}

export default function Results({ searchResults }: Props) {
  const router = useRouter()
  const keywords = router.query.kwd

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
      <h2 className='mb-2 text-2xl'>Results</h2>
      <p className='text-xl mb-4'>Your are looking for {keywords}</p>
      {searchResults.length ? (
        <section className='mt-8'>
          <ul className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] text-black gap-4'>
            {searchResults.map((result) => (
              <SearchResultsItem key={result.id} result={result} />
            ))}
          </ul>
        </section>
      ) : (
        <p>No results found.</p>
      )}
    </>
  )
}
