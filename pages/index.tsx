import Head from 'next/head'
import { Inter } from '@next/font/google'
import { API_BASE_URL, API_IMG_URL, API_KEY } from '../api'
import Image from 'next/image'
import { Header } from '../components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const endPoint = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=1`

export async function getStaticProps() {
  const res = await fetch(endPoint)
  const data = await res.json()
  const movies = data.results

  return {
    props: {
      movies,
    },
  }
}

export default function Home({ movies }: { movies: any }) {
  return (
    <>
      <Head>
        <title>Filmica - Discover your favourite films</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='max-w-5xl mx-auto'>
        <section className='grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] grid-cols gap-4'>
          {movies.map((movie: any) => (
            <article
              key={movie.id}
              className='bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between'
            >
              <div>
                <Image
                  className='rounded-t-lg mb-2 object-contain'
                  src={`${API_IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={384}
                  height={576}
                />
                <div className='px-4 py-2'>
                  <div className='flex justify-between items-start mb-2'>
                    <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2'>
                      {movie.title}
                    </h5>
                  </div>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    {movie.release_date}
                  </p>
                  <p className='font-normal text-gray-700 dark:text-gray-400 line-clamp-3'>
                    {movie.overview}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
