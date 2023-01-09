import Image from 'next/image'
import { API_IMG_URL, PROFILE_SIZES } from '../api'

interface Props {
  name: string
  profilePath: string
}

export function DetailPersonImage({ name, profilePath }: Props) {
  return (
    <div>
      <Image
        src={`${API_IMG_URL}${PROFILE_SIZES.md}${profilePath}`}
        className='mx-auto rounded-full aspect-square object-cover border-2 border-green-400/20'
        alt={name}
        height={220}
        width={220}
      />
    </div>
  )
}
