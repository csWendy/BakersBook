// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const express = require('express');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');
var serviceAccount = require("path/to/serviceAccountKey.json");
const firebaseHelper = require('firebase-functions-helper');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bakersbook-74fd9.firebaseio.com"
});





