import { EmblaOptionsType } from 'embla-carousel-react'
import { Cast, Crew } from '../types'
import { DetailPersonListSliderItem } from './DetailPersonListSliderItem'
import { ListSlider } from './ListSlider'

interface Props {
  items: Crew[] | Cast[]
  title: string
}

const carouselOptions: EmblaOptionsType = {
  dragFree: true,
  align: 'start',
  containScroll: 'trimSnaps',
  slidesToScroll: 5,
}

export const DetailPersonListSlider = ({ items, title }: Props) => {
  return (
    <section className='mb-8'>
      <div className='flex justify-between mb-4 items-center'>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map((person) => (
          <DetailPersonListSliderItem person={person} key={person.id} />
        ))}
      </ListSlider>
    </section>
  )
}
