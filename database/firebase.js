import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCDkX2tcu_P1Sh2dePiaVtMUyNBYn8cOBg",
  authDomain: "crud-firebase-ee643.firebaseapp.com",
  databaseURL: "https://crud-firebase-ee643-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-ee643",
  storageBucket: "crud-firebase-ee643.appspot.com",
  messagingSenderId: "1049193309494",
  appId: "1:1049193309494:web:7580b36467cd4c2d053f97",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
