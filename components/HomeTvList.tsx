import Link from 'next/link'
import { TvShowsListResult } from '../types'
import { HomeTvListItem } from './HomeTvListItem'

interface Props {
  title: string
  items: TvShowsListResult[]
  route: string
}

export function HomeTvList({ title, items, route }: Props) {
  return (
    <div className='md:mb-0 mb-12'>
      <Link href={`/${route}`}>
        <h3 className='text-xl font-semibold mb-4 hover:text-neutral-200 hover:underline hover:decoration-pink-400/80 hover:decoration-2'>
          {title}
        </h3>
      </Link>
      <ul className='flex flex-col gap-4'>
        {items.map((tvShow) => (
          <HomeTvListItem key={tvShow.id} tvShow={tvShow} />
        ))}
      </ul>
    </div>
  )
}
