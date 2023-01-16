import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Inter } from '@next/font/google'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { usePageLoading } from '../hooks/usePageLoading'
import { SpinnerPages } from '../components/SpinnerPages'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeadCustom } from '../components/HeadCustom'

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
      <HeadCustom
        title='Filmica - Discover your favourite movies'
        description='Discover your favourite movies, tv shows and people'
      />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            {isPageLoading ? <SpinnerPages /> : <Component {...pageProps} />}
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  )
}
