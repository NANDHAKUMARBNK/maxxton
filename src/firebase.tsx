import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCsJ4H3rejdVBOFcKSQBXaih5DlVcmGqXU",
  authDomain: "maxxton-react.firebaseapp.com",
  projectId: "maxxton-react",
  storageBucket: "maxxton-react.appspot.com",
  messagingSenderId: "1046557434659",
  appId: "1:1046557434659:web:556751c8d1aa8fd01be296",
  measurementId: "G-9WZ7QPQHN5",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
