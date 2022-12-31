import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyBx13RDz4zqVIU7d_9yCsD8dRTagAwmWCQ',
  authDomain: 'filmica.firebaseapp.com',
  projectId: 'filmica',
  storageBucket: 'filmica.appspot.com',
  messagingSenderId: '709109704012',
  appId: '1:709109704012:web:4c628701ef93ea864b9be9',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
