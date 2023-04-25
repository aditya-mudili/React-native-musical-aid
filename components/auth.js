// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwq-ZydA8EacVLLSttvMp0CA0NqkCHlDM",
  authDomain: "music-b2b5a.firebaseapp.com",
  projectId: "music-b2b5a",
  storageBucket: "music-b2b5a.appspot.com",
  messagingSenderId: "203831878141",
  appId: "1:203831878141:web:72694954dc5fd7f70d7994",
  measurementId: "G-7QZ7TRDTTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app);
