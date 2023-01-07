import { useState } from 'react'

export function useToggle(initialValue: any) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue(!value)
  return [value, toggle]
}
