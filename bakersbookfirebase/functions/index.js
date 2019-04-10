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
const firebase =  require('./fbconfig/firebaseConfig');
var FieldValue = require('firebase-admin').firestore.FieldValue;

admin.initializeApp();

const firestore = admin.firestore();

const app = express();
app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
  // admin.auth().verifyIdToken(req.body.token)
  // .then(function(decodedToken) {
    // console.log(decodedToken)
    // var uid = decodedToken.uid;
    // console.log(uid)
  // }).catch(function(error) {
    // console.log(error)
  // });
  var uid = verifyIdToken(req.body.token);
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

//asynchronous function that verifies auth token.
async function verifyIdToken(token) {
		let res = await admin.auth().verifyIdToken(token)
		.then(function(decodedToken) {
			//console.log(decodedToken);
			const uid = decodedToken.uid;
			//console.log(uid);
			return uid;
		}).catch(function(error) {
			//console.log(error);
			const uid = error;
			return uid;
		});	
		return res;
}


//Post User's recipe
app.post('/api/v1/recipe', (req, res) => {
	//console.log(req.headers.authorization);
	var token = req.headers.authorization.split(" ")[1];
	//console.log(token);
	let uid = verifyIdToken(token);
	setTimeout(function () {
		console.log(uid);	
		uid.then(value => {
			console.log(value.code);
			if (value.code == undefined) {
				setRecipe(req.body.name, req.body.category, req.body.recipe, req.body.url, value);
				let response = {
					success: true,
					name: req.body.name,
					category: req.body.category,
					recipe: req.body.recipe,
					imageUrl: req.body.url,
					status: 200
				};
				
				res.json(response);
			}
			else
				res.json(value);
		}).catch (error => {
			//console.log(error);
			res.json(error);
		});	
	}, 1000)
	//console.log(uid);		
})

function setRecipe(rName, rCategory, rRecipe, rUrl, rUid) {
	var rId = firestore.collection('recipes').doc().id;
	firestore.collection('recipes').doc(rId).set({
	name: rName,
	category: rCategory,
	recipe: rRecipe,
	imageUrl: rUrl,
	uid: rUid,
	recipe_id: rId,
	timestamp: FieldValue.serverTimestamp()
	});
}

//Get a recipe
app.get('/api/v1/recipe/:id', (req, res) => {
	var id = req.params.id;	
	firestore.collection('recipes').doc(id).get()
		.then(doc => {
			if(!doc.exists) {
				console.log('No such document.');
				res.json("{ Error : Document does not exist }");
			} else {
				let data = doc.data();
				console.log('Document data:', data);
				let response = {
					name: data.name,
					imageUrl: data.imageUrl,
					category: data.category,
					recipe_id: data.recipe_id,
					recipe: data.recipe
				};
				res.json(response);
			}
	}).catch(error => {
		console.log('Error getting document', error);
		res.json(error);
	});
})

//Get all recipe
app.get('/api/v1/recipe', (req, res) => {
	firestore.collection('recipes').get()
		.then(snapshot => {
			var responses = [];
			snapshot.forEach(doc => {
				let data = doc.data();
				console.log('Document data:', data);
				let response = {
					name: data.name,
					imageUrl: data.imageUrl,
					category: data.category,
					recipe_id: data.recipe_id,
					recipe: data.recipe
				};
				responses.push(response);
			});
			res.json(responses);
		}) .catch(err => {
			console.log('Error getting document', error);
			res.json(error);
		});
})


//Get User's recipes
app.get('/api/v1/user/recipe', (req, res) => {
	var token = req.headers.authorization.split(" ")[1];
	let uid = verifyIdToken(token);
	setTimeout(function () {
		console.log(uid);	
		uid.then(value => {
			console.log(value.code);
			if (value.code == undefined) {
				firestore.collection('recipes').where('uid', '==', value).get()
					.then(snapshot => {
						if (snapshot.empty) {
							console.log('No matching documents.');
							res.json("{ Error : No matching documents. }");
							return;
						}
						var responses = [];
						snapshot.forEach(doc => {
							let data = doc.data();
							console.log('Document data:', data);
							let response = {
								name: data.name,
								imageUrl: data.imageUrl,
								category: data.category,
								recipe_id: data.recipe_id,
								recipe: data.recipe
							};
							responses.push(response);
						});
						res.json(responses);
					}) .catch(error => {
						console.log('Error getting document', error);
						res.json(error);
					});
			}
			else
				res.json(value);
		}).catch (error => {
			//console.log(error);
			res.json(error);
		});	
	}, 1000)
})


exports.api = functions.https.onRequest(app);