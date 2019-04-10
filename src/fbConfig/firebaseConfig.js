import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCrbLgm-7pX_vR3OL09InOTq49oFUd_BbI",
  authDomain: "bakersbook-74fd9.firebaseapp.com",
  databaseURL: "https://bakersbook-74fd9.firebaseio.com",
  projectId: "bakersbook-74fd9",
  storageBucket: "bakersbook-74fd9.appspot.com",
  messagingSenderId: "104722015950"
};

firebase.initializeApp(config);

export default firebase;