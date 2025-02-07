
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkiZ-uzPoxTp2bL_PwKF6xr9cCX6IPzkE",
  authDomain: "cookie-app-351f3.firebaseapp.com",
  projectId: "cookie-app-351f3",
  storageBucket: "cookie-app-351f3.firebasestorage.app",
  messagingSenderId: "243673760027",
  appId: "1:243673760027:web:ee533f9ef8adee67ef93be"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };