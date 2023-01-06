import { EmblaOptionsType } from 'embla-carousel-react'
import { Cast } from '../types'
import { DetailCastListSliderItem } from './DetailCastListSliderItem'
import { ListSlider } from './ListSlider'

interface Props {
  items: Cast[]
  title: string
}

const carouselOptions: EmblaOptionsType = {
  dragFree: true,
  align: 'start',
  containScroll: 'trimSnaps',
  slidesToScroll: 5,
}

export const DetailCastListSlider = ({ items, title }: Props) => {
  return (
    <section className='mb-4'>
      <div className='flex justify-between mb-4 items-center'>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map((person) => (
          <DetailCastListSliderItem person={person} key={person.id} />
        ))}
      </ListSlider>
    </section>
  )
}
