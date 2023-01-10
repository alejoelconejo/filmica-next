import { ReactNode } from 'react'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='min-h-screen mt-32'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
