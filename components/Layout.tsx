import Head from 'next/head'
import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='max-w-5xl mx-auto'>{children}</main>
      <Footer />
    </>
  )
}
