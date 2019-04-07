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
const {Storage} = require('@google-cloud/storage');
var Busboy = require('busboy')
const path = require('path');
const os = require('os');
const fs = require('fs');


//admin SDK
admin.initializeApp();

//reference to our firestore
const firestore = admin.firestore();

//reference to our default bucket/storage
var bucket = admin.storage().bucket("images");


//initialize the express app
const app = express();
app.use(cors())
app.use(express.static('functions'));

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


/***********************************************************
                    STORAGE 
***********************************************************/

app.post('/api/v1/upload', (req, res) => {

  const busboy = new Busboy({headers: req.headers});

  //Current Path files to be uploaded to
  const currPath = path.join(__dirname, './images');
  
  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  //List of files uploaded
  const fileWrites = [];

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    // TODO(developer): Process submitted field values here
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  // This code will process each file uploaded.
  busboy.on('file', (fieldname, file, filename) => {
    console.log(`Processing file ${filename}`);


    // const filepath = path.join(currPath, filename);
    // uploads[fieldname] = filepath;
    // const writeStream = fs.createWriteStream(filepath);
    // file.pipe(writeStream);

    // // File was processed by Busboy; wait for it to be written to disk.
    // const promise = new Promise((resolve, reject) => {
    //   file.on('end', () => {
    //     writeStream.end();
    //   });
    //   writeStream.on('finish', resolve);
    //   writeStream.on('error', reject);
    // });

    // fileWrites.push(promise);
    
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', () => {
    console.log('Done parsing form!');
    // Promise.all(fileWrites).then(() => {
    //   // TODO(developer): Process saved files here
    //   for (const name in uploads) {
    //     const file = uploads[name];
    //     console.log(file)
    //     //deletes it
    //     fs.unlinkSync(file);
    //   }
    //   res.send();
    // });
  });

  
  busboy.end(req.rawBody);
  res.send('uploads ended')
})



/***********************************************************
                    API ENDPOINTS
***********************************************************/

app.get('/api/v1', (req, res) => {
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
          email: userRecord.user.email,
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          status: 200,
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
          status: 200,
          message: `User: ${doc.data().username} successfully signed in`
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
      status: 200,
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

app.get('/api/v1/users', (req, res) => {
  listAllUsers()
})

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        response = {
          uid: userRecord.uid,
          email: userRecord.email
        }
        console.log(response);
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}


exports.api = functions.https.onRequest(app);