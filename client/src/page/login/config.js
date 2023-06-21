// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOPrCI3uW_jggbO4LGI4r331gsw9IgjrY",
  authDomain: "ecommerce-1fc85.firebaseapp.com",
  projectId: "ecommerce-1fc85",
  storageBucket: "ecommerce-1fc85.appspot.com",
  messagingSenderId: "846095825939",
  appId: "1:846095825939:web:c84b02f8c6a94a63aa93e6",
  measurementId: "G-9XHXD4LM5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();
export { auth, provider, providerFB };
