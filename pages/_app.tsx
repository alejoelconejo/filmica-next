import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { usePageLoading } from '../hooks/usePageLoading'
import { SpinnerPages } from '../components/SpinnerPages'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()
  const { isPageLoading } = usePageLoading()
  const queryClient = new QueryClient()

  // Remove focus when changing route
  useEffect(() => {
    document.activeElement instanceof HTMLElement &&
      document.activeElement.blur()
  }, [router])

  return (
    <div className={`${inter.variable} font-sans bg-stars`}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title key='title'>Filmica - Discover your favourite films</title>
            <meta
              name='description'
              content='Generated by create next app'
              key='description'
            />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Layout>
            {isPageLoading ? <SpinnerPages /> : <Component {...pageProps} />}
          </Layout>
        </QueryClientProvider>
      </SessionProvider>
    </div>
  )
}
