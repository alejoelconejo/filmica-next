import Head from 'next/head'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Filmica - Discover your favourite films</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='max-w-5xl mx-auto'>
        <section>
          <h1 className='text-5xl font-bold'>
            ¡Hola! Soy
            <span className='text-orange-500 ml-3 text-[56px]'>Alejo</span>
          </h1>
        </section>
      </main>
    </>
  )
}
