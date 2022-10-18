import firebase from 'firebase';
import 'firebase/firestore'
require("firebase/functions")

// Firebase config.
const config = {
    apiKey: "AIzaSyBSN2mrYw5NjlUkHcS2NQxrJ3xTmRyT_o8",
    authDomain: "authenticate-4f340.firebaseapp.com",
    projectId: "authenticate-4f340",
    storageBucket: "authenticate-4f340.appspot.com",
    messagingSenderId: "607662288562",
    appId: "1:607662288562:web:02e4ff002c188f5cede3ab",
    measurementId: "G-6E05MNFDKY"
};

const Firebase = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(config);

if (Firebase){
    console.log("Firebase initialized")
}
const functions = firebase.functions();
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																									
// Initializes connection with firestore
var db = firebase.firestore();

// Test code snippet to make sure I have access to the the firestore db
// db.collection("wpPosts").get()	
// 	.then((querySnapshot) => {
// 		querySnapshot.forEach((doc) => {
// 			console.log(`${doc.id}`)
// 			console.log(doc.data())
// 		})
// 	})


export { Firebase };