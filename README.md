# :sparkles: :sparkles: BakersBook :sparkles: :sparkles:

This web app is for bakers or anyone who simply loves baking to post their very own recipe.
We are trying to make writing up recipes fun and interactive!

## Web Client - React  
Starting the client:  
```
$npm install
$npm start
```

## Firebase - Auth, Cloud Functions, Firestore, Storage
If you do not have firebase tools install, you can install it using npm:   
```
$npm install -g firebase-tools
```

Install the dependencies needed:  
```
$cd <path/to/backersbookfirebase/functions>
$npm install
```

Local Emulation of Functions:
```
$firebase serve --only functions,hosting
```

if port 5000 is in use, you can a) use a different port or b) kill that port:  
```
a) $firebase serve --only functions,hosting --port=8000
b) $lsof -t -i :5000
   $kill $(lsof -t -i :5000)
```
