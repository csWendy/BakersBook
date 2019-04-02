// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// var serviceAccount = require("./fbconfig/serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://bakersbook-74fd9.firebaseio.com"
// });

const functions = require('firebase-functions');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

const app = express();
app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/api/v1/', (req, res) => {
  res.send("This is BakersBook Api")
});

//Create a new user: email, password, username
app.post('/api/v1/register', jsonParser, (req, res) => {
  admin.auth().createUser({
    email: `${req.body.email}`,
    emailVerified: false,
    password: `${req.body.password}`,
    displayName: `${req.body.username}`,
    disabled: false
  })
  .then((userRecord) => {
    firestore.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      username: userRecord.displayName
    })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log('Error adding user to firestore:', error)
    })
  })
  .catch((error) => {
    console.log('Error creating new user:', error)
  })
});

//Get a user's info with valid uid
app.get('/api/v1/userinfo', jsonParser, (req, res) => {
  admin.auth().getUser(req.body.uid)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data') 
    res.json(userRecord);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

});


exports.api = functions.https.onRequest(app);