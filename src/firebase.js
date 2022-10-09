// eslint-disable-next-line
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPYI1aSkuIkfJK6YxE68uZjcUvqX9jhUI",
  authDomain: "notemaking-64089.firebaseapp.com",
  projectId: "notemaking-64089",
  storageBucket: "notemaking-64089.appspot.com",
  messagingSenderId: "380250039770",
  appId: "1:380250039770:web:10608cf5c0da94d5398ce3",
  measurementId: "G-VKTKXWHLSF"
};


!getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase
const db = getFirestore();
// const auth = getAuth();
// const storage = getStorage();

export default db;

// export { auth, storage };