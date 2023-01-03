import { collection, doc, setDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import { db } from '../utils/firebaseConfig'

interface FavoritesProviderProps {
  children: ReactNode
}

interface FavoritesItem {
  id: number
  title: string
  img: string
}

interface FavoritesContext {
  favoritesItems: FavoritesItem[]
  addToFavorites: (id: number, title: string, img: string) => void
  removeFromFavorites: (id: number) => void
  removeAllFavorites: () => void
  isFavorite: (id: number) => boolean
  setFavoritesItems: any
}

const FavoritesContext = createContext({} as FavoritesContext)

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoritesItems, setFavoritesItems] = useState<FavoritesItem[]>([])

  function addToFavorites(id: number, title: string, img: string) {
    setFavoritesItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, title, img }]
      } else {
        return [...currItems]
      }
    })

    const newFavRef = doc(collection(db, 'favorites'))

    const favData = {
      favs: [{ id, title, img }],
    }
    setDoc(newFavRef, favData)
  }

  function removeFromFavorites(id: number) {
    setFavoritesItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  function removeAllFavorites() {
    setFavoritesItems([])
  }

  function isFavorite(id: number) {
    return Boolean(favoritesItems.find((item) => item.id === id))
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoritesItems,
        addToFavorites,
        removeFromFavorites,
        removeAllFavorites,
        isFavorite,
        setFavoritesItems,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
