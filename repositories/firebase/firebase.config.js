import * as firebase from 'firebase';
import "firebase/firestore";
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBY7ImmnQYLt73LNsL0O9ap6hlW82TFas8",
    authDomain: "react-project-cb735.firebaseapp.com",
    databaseURL: "https://react-project-cb735.firebaseio.com",
    projectId: "react-project-cb735",
    storageBucket: "react-project-cb735.appspot.com",
    messagingSenderId: "620516354282",
    appId: "1:620516354282:web:6082a574111414b0a84f93",
    measurementId: "G-JJ8H9F2FJY"
};
// Initialize Firebase
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export{firebase, db}