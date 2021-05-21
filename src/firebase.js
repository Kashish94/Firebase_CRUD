import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDRn1w4s1MKtlqZ6H2zquQXkMERzKg7dKs",
    authDomain: "react-crud-c1c10.firebaseapp.com",
    databaseURL: "https://react-crud-c1c10-default-rtdb.firebaseio.com",
    projectId: "react-crud-c1c10",
    storageBucket: "react-crud-c1c10.appspot.com",
    messagingSenderId: "155337216549",
    appId: "1:155337216549:web:6332b9c6d7dada6ca6a5cc"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();