import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addToFavorites,
  checkIsFavorite,
  getFavorites,
  removeAllFavorites,
  removeFromFavorites,
} from '../utils/firebaseApi'

export function useAddFavorite(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      title,
      img,
      userId,
    }: {
      id: number
      title: string
      img: string
      userId: string
    }) => addToFavorites({ id, title, img, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      })
    },
  })
}

export function useRemoveFavorite(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      title,
      img,
      userId,
    }: {
      id: number
      title: string
      img: string
      userId: string
    }) => removeFromFavorites({ id, title, img, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      })
    },
  })
}

export function useRemoveAllFavorites(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => removeAllFavorites(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      })
    },
  })
}

export function useGetFavorites(userId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => getFavorites(userId),
  })
  return { isLoading, isError, data, error }
}

export function useCheckIsFavorite({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => checkIsFavorite({ id, userId }),
  })
  return {
    isLoading,
    isError,
    data,
    error,
  }
}
