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
const firebase = require('./fbconfig/firebaseConfig');
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
						uid: userRecord.user.uid,
						rid: []
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

/***********************************************************
                    USER ENDPOINTS
***********************************************************/

//Get a user's info with accessToken
app.get('/api/v1/userinfo', jsonParser, (req, res) => {
	var token = req.headers.authorization.split(" ")[1];
	if (!token || token === "") {
		res.send("No Access Token Found")
	}

	admin.auth().verifyIdToken(token)
	.then((decodedToken) => {
		let uid = decodedToken.uid
		
		firestore.collection('users').doc(uid).get()
		.then(snapshot => {
			let data = snapshot.data()
			let response = {
				email: data.email,
				username: data.username,
				firstname: data.firstname,
				lastname: data.lastname
			}

			res.json(response)
		})
		.catch(error => {
			console.log(error)
		})

	})
	.catch((error) => {
		console.log("Error decoding token")
		res.json(error)
	})

});

// app.get('/api/v1/users', (req, res) => {
// 	listAllUsers()
// })

// function listAllUsers(nextPageToken) {
// 	// List batch of users, 1000 at a time.
// 	admin.auth().listUsers(1000, nextPageToken)
// 		.then(function (listUsersResult) {
// 			listUsersResult.users.forEach(function (userRecord) {
// 				response = {
// 					uid: userRecord.uid,
// 					email: userRecord.email
// 				}
// 				console.log(response);
// 			});
// 			if (listUsersResult.pageToken) {
// 				// List next batch of users.
// 				listAllUsers(listUsersResult.pageToken);
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('Error listing users:', error);
// 		});
// }

//verify idToken TESTING ROUTE
// app.get('/api/v1/verifyIdToken', jsonParser, (req, res) => {
// 	admin.auth().verifyIdToken(req.body.token)
// 		.then(function (decodedToken) {
// 			console.log(decodedToken)
// 			var uid = decodedToken.uid;
// 			console.log(uid)
// 		}).catch(function (error) {
// 			console.log(error)
// 		});
// })

//asynchronous function that verifies auth token.
// async function verifyIdToken(token) {
// 		let res = await admin.auth().verifyIdToken(token)
// 		.then(function(decodedToken) {
// 			//console.log(decodedToken);
// 			const uid = decodedToken.uid;
// 			//console.log(uid);
// 			return uid;
// 		}).catch(function(error) {
// 			//console.log(error);
// 			const uid = error;
// 			return uid;
// 		});	
// 		return res;
// }

/***********************************************************
                    RECIPE ENDPOINTS
***********************************************************/
function setRecipe(rName, rCategory, rIngredient, rRecipe, rUrl, rUid) {
	let rId = firestore.collection('recipes').doc().id;

	firestore.collection('recipes').doc(rId).set({
		name: rName,
		category: rCategory,
		ingredient: rIngredient,
		recipe: rRecipe,
		imageUrl: rUrl,
		uid: rUid,
		rid: rId,
		timestamp: FieldValue.serverTimestamp()
	})

	firestore.collection('users').doc(rUid).update({
		rid: admin.firestore.FieldValue.arrayUnion(rId)
	})
}

//Post User's recipe
app.post('/api/v1/recipe', jsonParser, (req, res) => {
	var token = req.headers.authorization.split(" ")[1];
	if (!token || token === "") {
		res.send("No Access Token Found")
	}

	admin.auth().verifyIdToken(token)
		.then((decodedToken) => {
			let uid = decodedToken.uid
			console.log(uid)

			setRecipe(req.body.name,
				req.body.category,
				req.body.ingredient,
				req.body.recipe,
				req.body.imageUrl,
				uid)

			let response = {
				success: true,
				name: req.body.name,
				category: req.body.category,
				ingredient: req.body.ingredient,
				recipe: req.body.recipe,
				imageUrl: req.body.imageUrl,
				status: 200
			};

			res.json(response);
		})
		.catch((error) => {
			console.log("Error decoding token")
			res.json(error)
		})
})

// app.post('/api/v1/recipe', (req, res) => {
// 	//console.log(req.headers.authorization);
// 	var token = req.headers.authorization.split(" ")[1];
// 	//console.log(token);
// 	let uid = verifyIdToken(token);
// 	setTimeout(function () {
// 		console.log(uid);	
// 		uid.then(value => {
// 			console.log(`WHAT IS VALUE.CODE: ${value}`);
// 			if (value.code == undefined) {
// 				setRecipe(req.body.name, req.body.category, req.body.recipe, req.body.url, value);
// 				let response = {
// 					success: true,
// 					name: req.body.name,
// 					category: req.body.category,
// 					recipe: req.body.recipe,
// 					imageUrl: req.body.url,
// 					status: 200
// 				};

// 				res.json(response);
// 			}
// 			else
// 				res.json(value);
// 		}).catch (error => {
// 			//console.log(error);
// 			res.json(error);
// 		});	
// 	}, 1000)
// 	//console.log(uid);		
// })


//Get a recipe with rid
app.get('/api/v1/recipe/:rid', (req, res) => {
	var rid = req.params.rid;
	firestore.collection('recipes').doc(rid).get()
		.then(doc => {
			if (!doc.exists) {
				console.log('No such document.');
				res.json("{ Error : Document does not exist }");
			} else {
				let data = doc.data();
				console.log('Document data:', data);
				let response = {
					name: data.name,
					imageUrl: data.imageUrl,
					ingredient : data.ingredient,
					category: data.category,
					rid: data.rid,
					recipe: data.recipe
				};
				res.json(response);
			}
		}).catch(error => {
			console.log('Error getting document', error);
			res.json(error);
		});
})

// //Get all recipe
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
					ingredient: data.ingredient,
					category: data.category,
					rid: data.rid,
					recipe: data.recipe
				};
				responses.push(response);
			});
			res.json(responses);
		}).catch(error => {
			console.log('Error getting document', error);
			res.json(error);
		});
})


//Get User's recipes
app.get('/api/v1/user/recipe', (req, res) => {
	var token = req.headers.authorization.split(" ")[1];
	if (!token || token === "") {
		res.send("No Access Token Found")
	}

	admin.auth().verifyIdToken(token)
		.then((decodedToken) => {
			let uid = decodedToken.uid

			ridList = []
			recipeRefs = []
			recipes = []

			//Get the list of rids from user
			firestore.collection('users').doc(uid).get()
				.then(doc => {
					if (!doc.exists) {
						console.log("No such document")
					}
					else {
						ridList = doc.data().rid
						console.log(ridList)
					}

					ridList.forEach((rid) => {
						recipeRefs.push(firestore.collection('recipes').doc(rid))
					})

					firestore.getAll(...recipeRefs)
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								let data = doc.data()
								let response = {
									name: data.name,
									imageUrl: data.imageUrl,
									ingredient: data.ingredient,
									category: data.category,
									rid: data.rid,
									recipe: data.recipe
								};
								recipes.push(response);
							})

							res.json(recipes)
						})
						.catch(error => {
							console.log(error)
							res.json(error)
						})

				})

				.catch(error => {
					console.log(error)
					res.json(error)
				})

		})
		.catch((error) => {
			console.log("Error decoding token")
			res.json(error)
		})

})


// app.get('/api/v1/user/recipe', (req, res) => {
// 	var token = req.headers.authorization.split(" ")[1];
// 	let uid = verifyIdToken(token);
// 	setTimeout(function () {
// 		console.log(uid);
// 		uid.then(value => {
// 			console.log(value.code);
// 			if (value.code == undefined) {
// 				firestore.collection('recipes').where('uid', '==', value).get()
// 					.then(snapshot => {
// 						if (snapshot.empty) {
// 							console.log('No matching documents.');
// 							res.json("{ Error : No matching documents. }");
// 							return;
// 						}
// 						var responses = [];
// 						snapshot.forEach(doc => {
// 							let data = doc.data();
// 							console.log('Document data:', data);
// 							let response = {
// 								name: data.name,
// 								imageUrl: data.imageUrl,
// 								category: data.category,
// 								recipe_id: data.recipe_id,
// 								recipe: data.recipe
// 							};
// 							responses.push(response);
// 						});
// 						res.json(responses);
// 					}).catch(error => {
// 						console.log('Error getting document', error);
// 						res.json(error);
// 					});
// 			}
// 			else
// 				res.json(value);
// 		}).catch(error => {
// 			//console.log(error);
// 			res.json(error);
// 		});
// 	}, 1000)
// })

//delete a User's recipe with rid
app.delete('/api/v1/recipe/:rid', (req, res) => {
	var token = req.headers.authorization.split(" ")[1];
	if (!token || token === "") {
		res.send("No Access Token Found")
	}
	
	ridList = []
	
	var clientrid = req.params.rid;
	admin.auth().verifyIdToken(token)
		.then((decodedToken) => {
			let uid = decodedToken.uid
			//Check if the user made the recipe.
			firestore.collection('users').doc(uid).get()
				.then((doc) => {
					if (!doc.exists) {
						console.log("No such document")
					}
					else {
						ridList = doc.data().rid
						console.log(ridList)
					}
					var hasRid = ridList.includes(clientrid)
					if (hasRid)
					{
						//Delete Recipe from database
						firestore.collection('recipes').doc(clientrid).delete()
							.then(function() { 
								var message = "Document successfully deleted!"
								console.log(message);
							}).catch((error) => {
								console.log('Document not deleted:', error);
								res.json(error);
							})
							
						var newRidList = []
						ridList.forEach((element) => {
							if(element != clientrid)
								newRidList.push(element)
						})
						console.log(newRidList);
						//Update rid array
						firestore.collection('users').doc(uid)
							.update({rid: newRidList})
					}
					let response = {
						status: 204
					}
					res.json(response)
				})
				.catch((error) => {
					console.log("Error decoding token")
					res.json(error)
				})
		})
		.catch((error) => {
			console.log("Delete error: ", error)
			res.json(error)
		})
})


exports.api = functions.https.onRequest(app);