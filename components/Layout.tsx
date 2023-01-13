import { ReactNode } from 'react'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='min-h-screen sm:mt-28 mt-20'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
