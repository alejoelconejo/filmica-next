import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ReactNode } from 'react'

export const ListSlider = ({ children }: { children: ReactNode }) => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      '(max-width: 600px)': {
        slides: { perView: 3, spacing: 10 },
      },
    },
    mode: 'free',
    slides: {
      perView: 5,
      spacing: 10,
    },
  })

  return (
    <ul className='keen-slider' ref={sliderRef}>
      {children}
    </ul>
  )
}
