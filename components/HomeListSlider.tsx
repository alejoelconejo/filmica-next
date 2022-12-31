import { EmblaOptionsType } from 'embla-carousel-react'
import Link from 'next/link'
import { MovieListResult } from '../types'
import { ListSlider } from './ListSlider'
import { ListSliderItem } from './ListSliderItem'

interface Props {
  items: MovieListResult[]
  title: string
  route: string
}

const carouselOptions: EmblaOptionsType = {
  dragFree: true,
  align: 'start',
  containScroll: 'trimSnaps',
  slidesToScroll: 2,
}

export const HomeListSlider = ({ items, title, route }: Props) => {
  return (
    <section className='mb-8'>
      <div className='flex justify-between mb-4 items-center'>
        <h3 className='text-3xl font-semibold'>{title}</h3>
        <Link href={`/${route}`}>See all →</Link>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map((movie) => (
          <ListSliderItem movie={movie} key={movie.id} />
        ))}
      </ListSlider>
    </section>
  )
}
