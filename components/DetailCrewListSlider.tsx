import { EmblaOptionsType } from 'embla-carousel-react'
import { Crew } from '../types'
import { DetailCrewListSliderItem } from './DetailCrewListSliderItem'
import { ListSlider } from './ListSlider'

interface Props {
  items: Crew[]
  title: string
}

const carouselOptions: EmblaOptionsType = {
  dragFree: true,
  align: 'start',
  containScroll: 'trimSnaps',
  slidesToScroll: 5,
}

export const DetailCrewListSlider = ({ items, title }: Props) => {
  if (!items.length) return null

  return (
    <section className='mb-4'>
      <div className='flex justify-between mb-4 items-center'>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map(({ id, profile_path, name, department, credit_id }) => (
          <DetailCrewListSliderItem
            id={id}
            profilePath={profile_path}
            name={name}
            department={department}
            key={`${id}${credit_id}`}
          />
        ))}
      </ListSlider>
    </section>
  )
}
