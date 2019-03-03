import firebase from '@firebase/app'
import '@firebase/auth'
// Initialize Firebase 
  const config = {
    apiKey: "AIzaSyBkdCcjGGBRoNPdVJBfvkoBL6c853sR3Hc",
    authDomain: "dressme-mobile.firebaseapp.com",
    databaseURL: "https://dressme-mobile.firebaseio.com",
    projectId: "dressme-mobile",
    storageBucket: "dressme-mobile.appspot.com",
    messagingSenderId: "525559973377"
  };
  firebase.initializeApp(config);

  