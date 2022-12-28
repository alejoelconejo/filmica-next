import { useDebugValue, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialState as T)
  useDebugValue(state)

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setState(parse(item))
  }, [key])

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [state, key, initialState])

  return [state, setState]
}

const parse = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
