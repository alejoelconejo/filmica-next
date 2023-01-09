import { ReactNode } from 'react'

export const ListGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className='min-h-screen'>
      <ul className='grid grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(125px,_1fr))] gap-2 md:gap-4'>
        {children}
      </ul>
    </div>
  )
}
