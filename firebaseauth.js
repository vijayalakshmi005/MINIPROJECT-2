import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAMdYoNeWbmerokDFutYnGfbF5XjnZ8rrI",
   authDomain: "miniproject-50fa0.firebaseapp.com",
   projectId: "miniproject-50fa0",
   storageBucket: "miniproject-50fa0.appspot.com",
   messagingSenderId: "135026173308",
   appId: "1:135026173308:web:2616841e48a25482f470f9"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 
 const submit = document.getElementById('submit');
 submit.addEventListener("click", function(event) {
     event.preventDefault();
 
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
 
     createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             const user = userCredential.user;
             alert('User registered successfully');
             window.location.href = "preferences.html";
         })
         .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             alert(errorMessage);
         });
 });