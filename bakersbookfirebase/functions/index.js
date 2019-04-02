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
const firebase =  require('./fbconfig/firebaseConfig')

admin.initializeApp();

const firestore = admin.firestore();

const app = express();
app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/***********************************************************
                     REST API ENDPOINTS
***********************************************************/

app.get('/api/v1/', (req, res) => {
  res.send("This is BakersBook Api")
});


//Create a new user: email, password, username
app.post('/api/v1/register', jsonParser, (req, res) => {
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userRecord) => {
    firebase.auth().currentUser.getIdToken(true)
    .then(token => {
      firestore.collection('users').doc(userRecord.user.uid).set({
        email: userRecord.user.email,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        uid: userRecord.user.uid
      })
      .then(() => {
        response = {
          success: true,
          accessToken: token,
          message: `User: ${req.body.username} successfully created`
        }
        res.json(response)
      })
      .catch((error) => {
        console.log('Error adding user to firestore:', error)
        res.json(error)
      })
    })
    .catch(error => {
      console.log('Error cannot get token', error)
      res.json(error)
    })
    
  })
  .catch((error) => {
    console.log('Error creating new user:', error)
    res.json(error)
  })
});


//Sign In with email and password 
app.post('/api/v1/signin', jsonParser, (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userRecord) => {
    firebase.auth().currentUser.getIdToken(true)
    .then(token => {
      firestore.collection('users').doc(userRecord.user.uid).get()
      .then(doc => {
        response = {
          success: true,
          accessToken: token,
          email: doc.data().email,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname,
          username: doc.data().username,
          message: `User: ${doc.data().username} successfully created`
        }
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      })
    })
    .catch(error => {
      res.json(error)
    })
  })
  .catch((error) => {
    res.json(error)
  })  
});


//signout
app.post('/api/v1/signout', (req, res) => {
  firebase.auth().signOut()
  .then(() => {
    // Sign-out successful.
    response = {
      success: true,
      message: "signed out"
    }
    res.json(response)
  }).catch((error) => {
    // An error happened.
    console.log("Error signing out", error)
    res.json(error)
  })
});


//verify idToken
app.get('/api/v1/verifyIdToken', jsonParser, (req, res) => {
  admin.auth().verifyIdToken(req.body.token)
  .then(function(decodedToken) {
    console.log(decodedToken)
    var uid = decodedToken.uid;
    console.log(uid)
  }).catch(function(error) {
    console.log(error)
  });
})



//Get a user's info with valid uid
app.get('/api/v1/userinfo', jsonParser, (req, res) => {
  admin.auth().getUser(req.body.uid)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data') 
    res.json(userRecord);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error)
    res.json(error)
  });

});


exports.api = functions.https.onRequest(app);