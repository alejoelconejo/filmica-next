import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, PROFILE_SIZES } from '../api'
import { getInitialsFromFullName } from '../utils/getInitialsFromName'

interface Props {
  id: number
  profilePath: string
  name: string
  character: string
}

export const DetailCastListSliderItem = ({
  id,
  profilePath,
  name,
  character,
}: Props) => {
  return (
    <li className='hover:brightness-125 transition w-20'>
      <Link className='h-full block' href={`/person/${id}`}>
        <div className='h-full'>
          <div className='flex flex-col items-center'>
            {profilePath ? (
              <div className='h-[120px] w-20'>
                <Image
                  className='rounded-lg h-full object-cover position-center border border-neutral-700'
                  src={`${API_IMG_URL}${PROFILE_SIZES.md}${profilePath}`}
                  alt={name}
                  width={80}
                  height={120}
                  title={name}
                />
              </div>
            ) : (
              <div className='h-[120px] w-20 flex items-center justify-center border rounded-lg border-neutral-700'>
                <p className='line-clamp-2 text-center max-w-full font-semibold text-sm break-all'>
                  {getInitialsFromFullName(name)}
                </p>
              </div>
            )}
            <p className='text-sm text-center'>{name}</p>
          </div>
          <div>
            <p className='text-sm text-center text-neutral-400 line-clamp-2'>
              {character}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
