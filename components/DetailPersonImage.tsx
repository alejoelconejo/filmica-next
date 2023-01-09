import Image from 'next/image'
import { API_IMG_URL, PROFILE_SIZES } from '../api'
import { getInitialsFromFullName } from '../utils/getInitialsFromName'

interface Props {
  name: string
  profilePath: string
}

export function DetailPersonImage({ name, profilePath }: Props) {
  return profilePath ? (
    <div>
      <Image
        src={`${API_IMG_URL}${PROFILE_SIZES.xl}${profilePath}`}
        className='mx-auto rounded-full aspect-square object-cover border-2 border-green-400/20'
        alt={name}
        height={220}
        width={220}
      />
    </div>
  ) : (
    <div className='h-[220px] mx-auto rounded-full aspect-square object-cover border-2 border-green-400/20 bg-neutral-900 flex items-center justify-center'>
      <p className='line-clamp-2 max-w-full font-semibold text-2xl break-all'>
        {getInitialsFromFullName(name)}
      </p>
    </div>
  )
}
