# :cookie: :cookie: :cookie: Baker's Book :cookie: :cookie: :cookie:

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

To Deploy Functions:
```
$firebase deploy --only functions
```


## Firebase Functions/Api Endpoints

POST: Registering new user: email, password, firstname, lastname, username
Returns: success, accessToken, email, firstname, lastname, username, status, message
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/register
```

POST: Signing in: email, password
Returns: success, accessToken, email, firstname, lastname, username, status, message
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/signin
```

POST: Signing out:
Returns: success, status, message
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/signout
```

----------------------------------------------------------------------------------------

GET: User's information (Access Token Required)
Returns: email, username, firstname, lastname
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/userinfo
```

----------------------------------------------------------------------------------------

POST User's recipe: AuthToken, name, category, ingredient, recipe, imageUrl
Returns: success, name, category, ingredient, recipe, imageUrl, status
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/recipe
```

GET recipe with id: replace rid with the rid
Returns: name, category, ingredients, recipe, image, rid
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/recipe/:rid
```

GET all recipes:
Returns: recipes each with name, category, ingredient, recipe, image, rid
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/recipe
```

GET User's recipes: AuthToken
Returns: User's recipes each with name, category, ingredient, recipe, image, rid
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/user/recipe
```

DELETE User's recipes: AuthToken, rid
Returns: status
```
https://bakersbook-74fd9.firebaseapp.com/api/v1/recipe/:rid
```
