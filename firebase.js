import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBU1SZgInfHgpt57DZD8aqiU91ew5pkYB8",
  authDomain: "alextaymx-8dc80.firebaseapp.com",
  projectId: "alextaymx-8dc80",
  storageBucket: "alextaymx-8dc80.appspot.com",
  messagingSenderId: "94247065167",
  appId: "1:94247065167:web:75151395010e31e4473c3a",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;
