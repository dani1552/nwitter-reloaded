
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASh8bkwr3ZEgHD1mszcxxIdaqd583DqjI",
  authDomain: "nwitter-reloaded-1030.firebaseapp.com",
  projectId: "nwitter-reloaded-1030",
  storageBucket: "nwitter-reloaded-1030.appspot.com",
  messagingSenderId: "632027573568",
  appId: "1:632027573568:web:4df1a489e9da3139709ea5"
};

//create app using config option
const app = initializeApp(firebaseConfig);

//enable authentication service for apps
export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);