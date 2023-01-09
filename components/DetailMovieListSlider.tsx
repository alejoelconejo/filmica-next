import { EmblaOptionsType } from 'embla-carousel-react'
import { MovieListResult } from '../types'
import { DetailListSliderItem } from './DetailListSliderItem'
import { ListSlider } from './ListSlider'

interface Props {
  items: MovieListResult[]
  title: string
}

const carouselOptions: EmblaOptionsType = {
  dragFree: true,
  align: 'start',
  containScroll: 'trimSnaps',
  slidesToScroll: 5,
}

export const DetailMovieListSlider = ({ items, title }: Props) => {
  if (!items.length) return null

  return (
    <section className='mb-8'>
      <div className='flex justify-between mb-4 items-center'>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map((movie) => (
          <DetailListSliderItem movie={movie} key={movie.id} />
        ))}
      </ListSlider>
    </section>
  )
}
