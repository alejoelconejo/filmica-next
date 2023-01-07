import { useEffect, useRef, useState } from 'react'
import { useToggle } from '../hooks/useToggle'

interface Props {
  text: string
}

export function DetailLargeText({ text }: Props) {
  const [isExpanded, toggleExpansion] = useToggle(false)
  const [textHeight, setTextHeight] = useState(0)

  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTextHeight(textRef.current!.scrollHeight)
  }, [textRef.current?.innerText])

  const maxHeight = 145

  return (
    <div>
      <div
        ref={textRef}
        style={{
          maxHeight: isExpanded ? textHeight : maxHeight,
          overflow: 'hidden',
          transition: 'max-height 0.25s ease-out',
        }}
      >
        {text}
      </div>
      {textHeight > maxHeight && (
        <button
          className='underline text-orange-400 hover:text-orange-500 duration-75 transition-colors'
          onClick={toggleExpansion}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
