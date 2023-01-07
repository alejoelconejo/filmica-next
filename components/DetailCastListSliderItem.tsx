import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, PROFILE_SIZES } from '../api'
import { Cast } from '../types'
import { getInitialsFromFullName } from '../utils/getInitialsFromName'

interface Props {
  person: Cast
}

export const DetailCastListSliderItem = ({ person }: Props) => {
  return (
    <li className='min-w-0 flex-shrink-0 flex-grow-0 basis-1/4 sm:basis-1/6 md:basis-1/12'>
      <Link className='h-full block' href={`/person/${person.id}`}>
        <div className='h-full'>
          <div className='flex flex-col items-center'>
            {person.profile_path ? (
              <Image
                className='rounded-lg h-full object-cover position-center border border-neutral-700'
                src={`${API_IMG_URL}${PROFILE_SIZES.md}${person.profile_path}`}
                alt={person.name}
                width={80}
                height={120}
                title={person.name}
              />
            ) : (
              <div className='h-[120px] w-20 flex items-center justify-center border rounded-lg border-neutral-700'>
                <p className='line-clamp-2 text-center max-w-full font-semibold text-sm break-word'>
                  {getInitialsFromFullName(person.name)}
                </p>
              </div>
            )}
            <p className='text-sm text-center'>{person.name}</p>
          </div>
          <div>
            <p className='text-sm text-center text-neutral-400 line-clamp-2'>
              {person.character}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
