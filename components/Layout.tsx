import { ReactNode } from 'react'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='min-h-screen sm:mt-8 mt-4'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
