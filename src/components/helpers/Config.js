import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBxaP8_jAoKqFFDw1yz0moHMc7X7_2mGFY",
  authDomain: "geoid-c320b.firebaseapp.com",
  projectId: "geoid-c320b",
  storageBucket: "geoid-c320b.appspot.com",
  messagingSenderId: "754534691630",
  appId: "1:754534691630:web:c31e7841b561711b6840bf",
  measurementId: "G-J1ND0GGRJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const bucketDb = getStorage(app)