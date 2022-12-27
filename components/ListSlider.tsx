import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

export const ListSlider = ({ children }: any) => {
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
