// eslint-disable-next-line
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyB2ZS_wZiPMVwj8md2nW3FOwCNjXuQYGoA",
//   authDomain: "note-making-eb0df.firebaseapp.com",
//   projectId: "note-making-eb0df",
//   storageBucket: "note-making-eb0df.appspot.com",
//   messagingSenderId: "377786333764",
//   appId: "1:377786333764:web:fe1a74cbc6772cb1fb1a11",
//   measurementId: "G-WG6WK9XECE"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDeHIMoklegjn2MLwRxXutlZ-I3tH9CeUs",
    authDomain: "notemaking-63f3b.firebaseapp.com",
    projectId: "notemaking-63f3b",
    storageBucket: "notemaking-63f3b.appspot.com",
    messagingSenderId: "344229475391",
    appId: "1:344229475391:web:e87359937d1171315a348a"
  };


!getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase
const db = getFirestore();
// const auth = getAuth();
// const storage = getStorage();

export default db;

// export { auth, storage };