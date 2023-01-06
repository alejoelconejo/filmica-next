import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import { db } from '../utils/firebaseConfig'

interface FavoritesProviderProps {
  children: ReactNode
}

export interface FavoritesItem {
  id: number
  title: string
  img: string
}

interface FavoritesContext {
  favoritesItems: FavoritesItem[]
  addToFavorites: (
    id: number,
    title: string,
    img: string,
    userId: string
  ) => void
  removeFromFavorites: (
    id: number,
    title: string,
    img: string,
    userId: string
  ) => void
  removeAllFavorites: (userId: string) => void
  isFavorite: (id: number, userId: string) => boolean
  setFavoritesItems: any
}

const FavoritesContext = createContext({} as FavoritesContext)

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoritesItems, setFavoritesItems] = useState<FavoritesItem[]>([])

  async function addToFavorites(
    id: number,
    title: string,
    img: string,
    userId: string
  ) {
    if (userId === null) {
      alert('You must signin to add your favorite movies')
      return
    }

    const newFavRef = doc(db, 'favorites', userId)
    const docSnap = await getDoc(newFavRef)

    if (!docSnap.exists()) {
      const favData = {
        favs: [{ id, title, img }],
      }
      await setDoc(newFavRef, favData)
    } else {
      const favData = { id, title, img }
      await updateDoc(newFavRef, {
        favs: arrayUnion(favData),
      })
    }
  }

  async function removeFromFavorites(
    id: number,
    title: string,
    img: string,
    userId: string
  ) {
    const newFavRef = doc(db, 'favorites', userId)
    const favData = { id, title, img }
    await updateDoc(newFavRef, {
      favs: arrayRemove(favData),
    })
  }

  async function removeAllFavorites(userId: string) {
    const newFavRef = doc(db, 'favorites', userId)
    await deleteDoc(newFavRef)
  }

  function isFavorite(id: number, userId: string) {
    // return Boolean(favoritesItems.find((item) => item.id === id))
    //
    // if (userId === null) return false
    // const newFavRef = doc(db, 'favorites', userId)
    // const docSnap = await getDoc(newFavRef)
    // return docSnap.exists()
    return false
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

export async function getFavorites(userId: string) {
  const newFavRef = doc(db, 'favorites', userId)
  const docSnap = await getDoc(newFavRef)

  if (!docSnap.exists()) {
    return null
  }

  const favsArray = docSnap.data().favs
  return favsArray
}
