import { EmblaOptionsType } from 'embla-carousel-react'
import Link from 'next/link'
import { TvShowsListResult } from '../types'
import { DetailTVListSliderItem } from './DetailTVListSliderItem'
import { ListSlider } from './ListSlider'

interface Props {
  items: TvShowsListResult[]
  title: string
  route?: string | null
}

const carouselOptions: EmblaOptionsType = {
  dragFree: true,
  align: 'start',
  containScroll: 'trimSnaps',
  slidesToScroll: 5,
}

export function DetailTVListSlider({ items, title, route = null }: Props) {
  if (!items.length) return null

  return (
    <section className='mb-8'>
      <div className='flex justify-between mb-4 items-center'>
        {route ? (
          <>
            <Link
              href={`/${route}`}
              className='hover:text-orange-400 transition'
            >
              <h2 className='text-xl font-semibold'>{title}</h2>
            </Link>
            <Link
              className='flex items-center hover:text-orange-400 transition font-semibold'
              href={`/${route}`}
            >
              View all →
            </Link>
          </>
        ) : (
          <h2 className='text-xl font-semibold'>{title}</h2>
        )}
      </div>
      <ListSlider options={carouselOptions}>
        {items.map((tvShow) => (
          <DetailTVListSliderItem tvShow={tvShow} key={tvShow.id} />
        ))}
      </ListSlider>
    </section>
  )
}
