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
  slidesToScroll: 5,
}

export const HomeListSlider = ({ items, title, route }: Props) => {
  return (
    <section className='mb-12'>
      <div className='flex justify-between mb-4 items-center'>
        <Link href={`/${route}`}>
          <h2 className='font-semibold text-2xl hover:text-neutral-200 hover:underline hover:decoration-green-500/50 hover:decoration-2'>
            {title}
          </h2>
        </Link>
        <Link
          className='flex items-center hover:text-orange-400 hover:brightness-125 transition font-semibold'
          href={`/${route}`}
        >
          View all →
        </Link>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map((movie) => (
          <ListSliderItem movie={movie} key={movie.id} />
        ))}
      </ListSlider>
    </section>
  )
}
