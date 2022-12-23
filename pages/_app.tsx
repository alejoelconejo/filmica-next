import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FavoritesProvider } from '../contexts/FavoriteContext'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </div>
  )
}
