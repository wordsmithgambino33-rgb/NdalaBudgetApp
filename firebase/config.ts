
// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1mq3nb7QH8BzJI0DCPCMGOcIVUndZRac",
  authDomain: "ndalabudgetapp.firebaseapp.com",
  projectId: "ndalabudgetapp",
  storageBucket: "ndalabudgetapp.firebasestorage.app",
  messagingSenderId: "758488180271",
  appId: "1:758488180271:web:0f18554f92dea7f9bd08da"
  // measurementId is optional and not used in Expo
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
