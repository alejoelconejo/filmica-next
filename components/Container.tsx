import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Container({ children }: Props) {
  return <div className='max-w-5xl mx-auto px-2'>{children}</div>
}
