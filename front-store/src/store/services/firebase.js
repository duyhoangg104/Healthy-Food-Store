/** @format */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.APP_FIREBASE_API_KEY,
  authDomain: "nextjs-learning-e582d.firebaseapp.com",
  databaseURL: process.env.APP_FIREBASE_DATABASE_URL,
  projectId: "nextjs-learning-e582d",
  storageBucket: "nextjs-learning-e582d.appspot.com",
  messagingSenderId: process.env.APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.APP_FIREBASE_APP_ID,
  measurementId: process.env.APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
