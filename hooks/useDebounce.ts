import { useCallback, useEffect } from 'react'

export function useDebounce(
  effect: () => void,
  dependencies: string[],
  delay: number
) {
  const callback = useCallback(effect, dependencies)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}
