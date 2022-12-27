import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='max-w-5xl mx-auto px-2 md:px-0'>{children}</main>
      <Footer />
    </>
  )
}
