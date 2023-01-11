import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebaseConfig'

export interface FavoritesItem {
  id: number
  title: string
  img: string
}

export async function checkIsFavorite({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  if (userId === null) return false
  const newFavRef = doc(db, 'favorites', userId)
  const docSnap = await getDoc(newFavRef)
  if (!docSnap.exists()) {
    return null
  }
  const favsArray: FavoritesItem[] = docSnap.data().favs
  return Boolean(favsArray.find((item) => item.id === id))
}

export async function removeFromFavorites({
  id,
  title,
  img,
  userId,
}: {
  id: number
  title: string
  img: string
  userId: string
}) {
  const newFavRef = doc(db, 'favorites', userId)
  const favData = { id, title, img }
  await updateDoc(newFavRef, {
    favs: arrayRemove(favData),
  })
}

export async function removeAllFavorites(userId: string) {
  const newFavRef = doc(db, 'favorites', userId)
  await deleteDoc(newFavRef)
}

export async function getFavorites(
  userId: string
): Promise<FavoritesItem[] | null> {
  const newFavRef = doc(db, 'favorites', userId)
  const docSnap = await getDoc(newFavRef)

  if (!docSnap.exists()) {
    return null
  }

  const favsArray = docSnap.data().favs
  return favsArray
}

export async function addToFavorites({
  id,
  title,
  img,
  userId,
}: {
  id: number
  title: string
  img: string
  userId: string
}) {
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
