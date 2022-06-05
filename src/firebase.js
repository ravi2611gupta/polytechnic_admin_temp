// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Arjit sir firebase database
// const firebaseConfig = {
//   apiKey: "AIzaSyBIFNY87L0bwM0pK20I334ZaaruINifCdI",
//   authDomain: "gp-mohammadi.firebaseapp.com",
//   projectId: "gp-mohammadi",
//   storageBucket: "gp-mohammadi.appspot.com",
//   messagingSenderId: "939592294740",
//   appId: "1:939592294740:web:e1ae349f8f91289ed228c1",
//   measurementId: "G-21NX10CHMG"
// };


const firebaseConfig = {
  apiKey: "AIzaSyCGtaA6qRo0JqJ53GrWQHDpxTcT0g2nbqM",
  authDomain: "gp-mohammadi-d8253.firebaseapp.com",
  projectId: "gp-mohammadi-d8253",
  storageBucket: "gp-mohammadi-d8253.appspot.com",
  messagingSenderId: "587228624475",
  appId: "1:587228624475:web:1407b572bf5798b0bef17e",
  measurementId: "G-SGZPWS4EW7"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
