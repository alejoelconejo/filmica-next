import { useRouter } from 'next/router'
import { API_BASE_URL, API_KEY } from '../../api'
import { SearchResultsItem } from '../../components/SearchResultsItem'

export async function getServerSideProps(context: any) {
  const keywords = context.query.kwd
  const endPoint = `${API_BASE_URL}/search/multi?api_key=${API_KEY}&language=es-ES&query=${keywords}&page=1`
  const res = await fetch(endPoint)
  const data = await res.json()
  const searchResults = data.results

  return {
    props: {
      searchResults,
    },
  }
}

export default function Results({ searchResults }: any) {
  const router = useRouter()
  const keywords = router.query.kwd

  return (
    <>
      <h2 className='mb-2 text-2xl'>Results</h2>
      <p className='text-xl mb-4'>Your are looking for {keywords}</p>
      {searchResults.length ? (
        <section className='mt-8'>
          <ul className='flex flex-col gap-4'>
            {searchResults.map((result: any) => (
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
