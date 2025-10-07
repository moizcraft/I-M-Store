import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBW_JjnnVXzzeuqY_LGHIZFcE7yRlGz8V0",
  authDomain: "from-2c3a0.firebaseapp.com",
  projectId: "from-2c3a0",
  storageBucket: "from-2c3a0.firebasestorage.app",
  messagingSenderId: "774076892457",
  appId: "1:774076892457:web:49ee9c140eda11acd9a338"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
}
