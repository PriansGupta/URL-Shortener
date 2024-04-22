// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5Z_Hi13xnNSVuoF3d_eIj6YcUM8iJ6mI",
  authDomain: "url-shortener-db8c4.firebaseapp.com",
  projectId: "url-shortener-db8c4",
  storageBucket: "url-shortener-db8c4.appspot.com",
  messagingSenderId: "714038689240",
  appId: "1:714038689240:web:00fe90e5cdea527db646ad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
