import { ReactNode } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

interface Props {
  children: ReactNode
  options: EmblaOptionsType
}

export const ListSlider = ({ children, options }: Props) => {
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className='overflow-hidden' ref={emblaRef}>
      <ul className='flex gap-2'>{children}</ul>
    </div>
  )
}
