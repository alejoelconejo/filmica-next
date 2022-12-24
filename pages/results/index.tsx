import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { API_BASE_URL, API_IMG_URL, API_KEY } from '../../api'

export async function getServerSideProps(context: any) {
  const keywords = context.query.kwd
  const endPoint = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${keywords}&page=1`
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
            {searchResults.map((movie: any) => (
              <li key={movie.id} className='flex gap-4'>
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    src={`${API_IMG_URL}${movie.poster_path}`}
                    alt={movie.original_title}
                    height={128}
                    width={64}
                  />
                </Link>
                <Link className='text-xl h-fit' href={`/movie/${movie.id}`}>
                  {movie.original_title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p>No results found.</p>
      )}
    </>
  )
}
