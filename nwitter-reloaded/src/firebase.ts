
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASh8bkwr3ZEgHD1mszcxxIdaqd583DqjI",
  authDomain: "nwitter-reloaded-1030.firebaseapp.com",
  projectId: "nwitter-reloaded-1030",
  storageBucket: "nwitter-reloaded-1030.appspot.com",
  messagingSenderId: "632027573568",
  appId: "1:632027573568:web:4df1a489e9da3139709ea5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);