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
  if (!items.length) return null

  return (
    <section className='mb-4'>
      <div className='flex justify-between mb-4 items-center'>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <ListSlider options={carouselOptions}>
        {items.map(({ id, profile_path, name, character, cast_id }) => (
          <DetailCastListSliderItem
            key={`${id}${cast_id}`}
            id={id}
            name={name}
            character={character}
            profilePath={profile_path}
          />
        ))}
      </ListSlider>
    </section>
  )
}
